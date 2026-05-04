import { currentStreak, monthlyAdherence } from '../utils/habitStats'
import ActionsMenu from './ActionsMenu'

function HabitItem({ habit, completions, onEdit, onDelete }) {
  const frequencyLabel = {
    daily: 'todo dia',
    weekly: 'algumas vezes na semana',
  }[habit.frequency] || 'todo dia'

  const streak = currentStreak(habit, completions)
  const adherence = monthlyAdherence(habit, completions)

  const actions = []
  if (onEdit) actions.push({ label: 'Editar', onClick: () => onEdit(habit) })
  if (onDelete) actions.push({ label: 'Excluir', onClick: () => onDelete(habit), destructive: true })

  return (
    <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="text-2xl flex-shrink-0">{habit.emoji || '✨'}</span>
        <div className="min-w-0">
          <h4 className="text-white font-medium truncate">{habit.name}</h4>
          <p className="text-zinc-500 text-sm mt-0.5">
            {frequencyLabel} · meta {habit.target} {habit.unit}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="text-right">
          <p className="text-zinc-600 text-xs uppercase tracking-wider">streak</p>
          <p className="text-white text-lg font-medium">
            {streak}
            {streak > 0 && <span className="text-orange-400 ml-1">🔥</span>}
          </p>
        </div>

        <div className="text-right">
          <p className="text-zinc-600 text-xs uppercase tracking-wider">mês</p>
          <p className={`text-lg font-medium ${adherence >= 70 ? 'text-violet-400' : 'text-zinc-400'}`}>
            {adherence}%
          </p>
        </div>

        {actions.length > 0 && <ActionsMenu actions={actions} />}
      </div>
    </div>
  )
}

export default HabitItem