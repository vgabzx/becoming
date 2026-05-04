import { identityMonthlyAdherence } from '../utils/habitStats'
import ActionsMenu from './ActionsMenu'

function IdentityCard({ identity, completions, onEdit, onDelete }) {
  const habitCount = identity.habits?.length || 0
  const adherence = completions ? identityMonthlyAdherence(identity, completions) : 0

  const actions = []
  if (onEdit) actions.push({ label: 'Editar', onClick: () => onEdit(identity) })
  if (onDelete) actions.push({ label: 'Excluir', onClick: () => onDelete(identity), destructive: true })

  return (
    <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all cursor-pointer h-full">
      <div className="flex items-start gap-4">
        <div
          className="w-1 h-14 rounded-full flex-shrink-0"
          style={{ backgroundColor: identity.color }}
        />

        <div className="flex-1 min-w-0">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Sou
          </p>
          <h3 className="text-2xl font-serif italic text-white truncate">
            {identity.name}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">
            {habitCount} {habitCount === 1 ? 'hábito' : 'hábitos'}
            {habitCount > 0 && (
              <>
                {' · '}
                <span className={adherence >= 70 ? 'text-violet-400' : 'text-zinc-400'}>
                  {adherence}% este mês
                </span>
              </>
            )}
          </p>
        </div>

        {actions.length > 0 && <ActionsMenu actions={actions} />}
      </div>
    </div>
  )
}

export default IdentityCard