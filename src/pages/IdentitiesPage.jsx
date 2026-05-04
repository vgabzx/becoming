import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import IdentityCard from '../components/IdentityCard'
import NewIdentityModal from '../components/NewIdentityModal'
import ConfirmDialog from '../components/ConfirmDialog'

function IdentitiesPage({ identities, completions, onAddIdentity, onUpdateIdentity, onDeleteIdentity }) {
  const [modalState, setModalState] = useState({ open: false, editing: null })
  const [confirmDelete, setConfirmDelete] = useState(null)

  function openCreate() {
    setModalState({ open: true, editing: null })
  }

  function openEdit(identity) {
    setModalState({ open: true, editing: identity })
  }

  function closeModal() {
    setModalState({ open: false, editing: null })
  }

  function handleSave(data) {
    if (modalState.editing) {
      onUpdateIdentity(modalState.editing.id, data)
    } else {
      onAddIdentity(data)
    }
    closeModal()
  }

  function handleConfirmDelete() {
    onDeleteIdentity(confirmDelete.id)
    setConfirmDelete(null)
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h1 className="text-4xl font-serif italic">Suas identidades</h1>
          <p className="text-zinc-500 mt-2">
            {identities.length === 0
              ? 'Comece definindo quem você quer se tornar.'
              : `${identities.length} ${identities.length === 1 ? 'identidade' : 'identidades'} em construção.`}
          </p>
        </div>

        <button
          onClick={openCreate}
          className="bg-violet-500 hover:bg-violet-600 transition-colors px-5 py-2.5 rounded-full text-sm font-medium"
        >
          + Nova identidade
        </button>
      </div>

      {identities.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-2xl py-20 text-center">
          <p className="text-zinc-600 font-serif italic text-xl">
            "Você não se eleva ao nível dos seus objetivos.<br />
            Você cai ao nível dos seus sistemas."
          </p>
          <p className="text-zinc-700 text-sm mt-3">— James Clear</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {identities.map((identity, i) => (
            <motion.div
              key={identity.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.25 }}
              className="relative"
            >
              <Link to={`/identidade/${identity.id}`} className="block">
                <IdentityCard
                  identity={identity}
                  completions={completions}
                  onEdit={openEdit}
                  onDelete={(idn) => setConfirmDelete(idn)}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {modalState.open && (
        <NewIdentityModal
          identity={modalState.editing}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title={`Excluir "${confirmDelete.name}"?`}
          description={`Essa ação vai remover essa identidade e todos os ${confirmDelete.habits?.length || 0} hábitos vinculados, junto com todo o histórico. Não pode ser desfeito.`}
          confirmLabel="Excluir tudo"
          onCancel={() => setConfirmDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  )
}

export default IdentitiesPage