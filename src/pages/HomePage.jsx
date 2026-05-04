import { Link } from 'react-router-dom'
import HabitDayItem from '../components/HabitDayItem'
import { getGreeting, getDayMessage, getInspirational } from '../data/messages'

function HomePage({ identities, completions, onMarkHabit, onUnmarkHabit }) {
  const today = new Date()
  const dateLabel = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const todayKey = todayKeyFor(today)

  const allHabits = identities.flatMap((identity) =>
    (identity.habits || []).map((habit) => ({ habit, identity }))
  )

  const completedCount = allHabits.filter(({ habit }) => {
    const count = getCount(completions, habit.id, todayKey)
    return count >= habit.target
  }).length

  const totalHabits = allHabits.length
  const percent = totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100)

  const greeting = getGreeting()
  const message = getDayMessage({ percent, completed: completedCount, total: totalHabits })
  const inspirational = getInspirational()

  // Estado vazio: ainda não tem hábitos
  if (totalHabits === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-zinc-500 text-sm capitalize mb-2">{dateLabel}</p>
        <h1 className="text-4xl md:text-5xl font-serif italic mb-4 leading-tight">
          {greeting}
        </h1>

        <div className="border border-dashed border-zinc-800 rounded-2xl py-16 px-6 text-center mt-12">
          <p className="text-zinc-300 font-serif italic text-2xl mb-3">
            {message.title}
          </p>
          <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            {message.subtitle}
          </p>
          <Link
            to="/identidades"
            className="inline-block bg-violet-500 hover:bg-violet-600 transition-colors px-6 py-2.5 rounded-full text-sm font-medium"
          >
            Definir quem quero ser
          </Link>
        </div>

        <p className="text-zinc-700 text-xs italic text-center mt-12 max-w-md mx-auto">
          {inspirational}
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-12">
        <p className="text-zinc-500 text-sm capitalize">{dateLabel}</p>
        <p className="text-zinc-400 text-lg mt-1 font-serif italic">{greeting}</p>

        <h1 className="text-4xl md:text-5xl font-serif italic mt-4 leading-tight">
          {message.title}
        </h1>
        <p className="text-zinc-500 mt-3 leading-relaxed">
          {message.subtitle}
        </p>

        <div className="mt-6 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="space-y-10">
        {identities.map((identity) => {
          const habits = identity.habits || []
          if (habits.length === 0) return null

          return (
            <section key={identity.id}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: identity.color }}
                />
                <p className="text-zinc-500 text-sm uppercase tracking-wider">
                  Sou
                </p>
                <Link
                  to={`/identidade/${identity.id}`}
                  className="text-white font-serif italic text-lg hover:text-violet-300 transition-colors"
                >
                  {identity.name}
                </Link>
              </div>

              <div className="space-y-2">
                {habits.map((habit) => (
                  <HabitDayItem
                    key={habit.id}
                    habit={habit}
                    count={getCount(completions, habit.id, todayKey)}
                    onIncrement={() => onMarkHabit(habit.id, todayKey)}
                    onDecrement={() => onUnmarkHabit(habit.id, todayKey)}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <p className="text-zinc-700 text-xs italic text-center mt-16 max-w-md mx-auto">
        {inspirational}
      </p>
    </main>
  )
}

function todayKeyFor(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getCount(completions, habitId, dateKey) {
  return completions[habitId]?.[dateKey] || 0
}

export default HomePage