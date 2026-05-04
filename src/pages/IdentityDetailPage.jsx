import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import HabitItem from '../components/HabitItem'
import NewHabitModal from '../components/NewHabitModal'
import HabitHeatmap from '../components/HabitHeatmap'
import ConfirmDialog from '../components/ConfirmDialog'
import ActionsMenu from '../components/ActionsMenu'
import { identityMonthlyAdherence } from '../utils/habitStats'

function IdentityDetailPage({ identities, completions, onAddHabit, onUpdateHabit, onDeleteHabit, onDeleteIdentity }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [habitModal, setHabitModal] = useState({ open: false, editing: null })
  const [confirmDeleteHabit, setConfirmDeleteHabit] = useState(null)
  const [confirmDeleteIdentity, setConfirmDeleteIdentity] = useState(false)

  const identity = identities.find((i) => i.id === id)

  if (!identity) {
    return <Navigate to="/identidades" replace />
  }

  const habits = identity.habits || []
  const identityAdherence = identityMonthlyAdherence(identity, completions)

  function handleSaveHabit(data) {
    if (habitModal.editing) {
      onUpdateHabit(identity.id, habitModal.editing.id, data)
    } else {
      onAddHabit(identity.id, data)
    }
    setHabitModal({ open: false, editing: null })
  }

  function handleConfirmDeleteHabit() {
    onDeleteHabit(identity.id, confirmDeleteHabit.id)
    setConfirmDeleteHabit(null)
  }

  function handleConfirmDeleteIdentity() {
    onDeleteIdentity(identity.id)
    navigate('/identidades')
  }

  const identityActions = [
    {
      label: 'Excluir identidade',
      onClick: () => setConfirmDeleteIdentity(true),
      destructive: true,
    },
  ]

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link
        to="/identidades"
        className="text-zinc-500 hover:text-white text-sm transition-colors inline-flex items-center gap-1 mb-8"
      >
        ← voltar
      </Link>

      <div className="flex items-start gap-4 mb-8">
        <div
          className="w-1.5 h-20 rounded-full flex-shrink-0 mt-1"
          style={{ backgroundColor: identity.color }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">
            Estou me tornando
          </p>
          <h1 className="text-5xl font-serif italic text-white leading-tight">
            {identity.name}
          </h1>
        </div>
        <ActionsMenu actions={identityActions} />
      </div>

      {habits.length > 0 && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-12">
          <p className="text-zinc-500 text-sm">
            Este mês você está sendo
          </p>
          <p className="text-3xl font-serif italic mt-1">
            <span className="text-violet-400">{identityAdherence}%</span> essa pessoa
          </p>
          <p className="text-zinc-600 text-xs mt-2">
            média de aderência aos {habits.length} {habits.length === 1 ? 'hábito' : 'hábitos'} dessa identidade
          </p>
        </div>
      )}

      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium">Evidências diárias</h2>
          <p className="text-zinc-500 text-sm mt-1">
            Pequenas ações que provam essa identidade.
          </p>
        </div>

        <button
          onClick={() => setHabitModal({ open: true, editing: null })}
          className="bg-violet-500 hover:bg-violet-600 transition-colors px-4 py-2 rounded-full text-sm font-medium"
        >
          + Novo hábito
        </button>
      </div>

      {habits.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl py-16 text-center">
          <p className="text-zinc-600 font-serif italic">
            Toda identidade precisa de evidências.
          </p>
          <p className="text-zinc-700 text-sm mt-2">
            Comece com um hábito simples.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              habit={habit}
              completions={completions}
              onEdit={(h) => setHabitModal({ open: true, editing: h })}
              onDelete={(h) => setConfirmDeleteHabit(h)}
            />
          ))}
        </div>
      )}

      {habitModal.open && (
        <NewHabitModal
          identity={identity}
          habit={habitModal.editing}
          onClose={() => setHabitModal({ open: false, editing: null })}
          onSave={handleSaveHabit}
        />
      )}

      {confirmDeleteHabit && (
        <ConfirmDialog
          title={`Excluir "${confirmDeleteHabit.name}"?`}
          description="Essa ação vai remover o hábito e todo o histórico de marcações dele. Não pode ser desfeito."
          confirmLabel="Excluir hábito"
          onCancel={() => setConfirmDeleteHabit(null)}
          onConfirm={handleConfirmDeleteHabit}
        />
      )}

      {confirmDeleteIdentity && (
        <ConfirmDialog
          title={`Excluir "${identity.name}"?`}
          description={`Essa ação vai remover essa identidade e todos os ${habits.length} hábitos vinculados, junto com todo o histórico. Não pode ser desfeito.`}
          confirmLabel="Excluir tudo"
          onCancel={() => setConfirmDeleteIdentity(false)}
          onConfirm={handleConfirmDeleteIdentity}
        />
      )}
    </main>
  )
}

function HabitRow({ habit, completions, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <div onClick={() => setExpanded(!expanded)} className="cursor-pointer">
        <HabitItem
          habit={habit}
          completions={completions}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
      {expanded && (
        <div className="pl-2">
          <HabitHeatmap habit={habit} completions={completions} />
        </div>
      )}
    </div>
  )
}

export default IdentityDetailPage