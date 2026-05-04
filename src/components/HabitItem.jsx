function HabitItem({ habit }) {
  const frequencyLabel = {
    daily: 'todo dia',
    weekly: 'algumas vezes na semana',
  }[habit.frequency] || 'todo dia'

  return (
    <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-5 transition-all flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-2xl">{habit.emoji || '✨'}</span>
        <div>
          <h4 className="text-white font-medium">{habit.name}</h4>
          <p className="text-zinc-500 text-sm mt-0.5">
            {frequencyLabel} · meta {habit.target} {habit.unit}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-zinc-600 text-xs uppercase tracking-wider">streak</p>
        <p className="text-zinc-400 text-lg font-medium">0</p>
      </div>
    </div>
  )
}

export default HabitItem