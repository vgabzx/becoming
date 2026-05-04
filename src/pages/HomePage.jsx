import { Link } from 'react-router-dom'
import HabitDayItem from '../components/HabitDayItem'

function HomePage({ identities, completions, onMarkHabit, onUnmarkHabit }) {
  // Data de hoje formatada
  const today = new Date()
  const dateLabel = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const todayKey = todayKeyFor(today)

  // Lista plana de todos os hábitos com sua identidade
  const allHabits = identities.flatMap((identity) =>
    (identity.habits || []).map((habit) => ({ habit, identity }))
  )

  // Quantos foram completados hoje (atingiram a meta)
  const completedCount = allHabits.filter(({ habit }) => {
    const count = getCount(completions, habit.id, todayKey)
    return count >= habit.target
  }).length

  const totalHabits = allHabits.length
  const percent = totalHabits === 0 ? 0 : Math.round((completedCount / totalHabits) * 100)

  // Estado vazio: usuário ainda não tem hábitos cadastrados
  if (totalHabits === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="border border-dashed border-zinc-800 rounded-2xl py-20 text-center">
          <p className="text-zinc-400 font-serif italic text-2xl mb-3">
            Sua jornada ainda não começou.
          </p>
          <p className="text-zinc-600 text-sm mb-8">
            Crie uma identidade e adicione hábitos pra começar a se tornar.
          </p>
          <Link
            to="/identidades"
            className="inline-block bg-violet-500 hover:bg-violet-600 transition-colors px-6 py-2.5 rounded-full text-sm font-medium"
          >
            Criar primeira identidade
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* CABEÇALHO COM PROGRESSO DO DIA */}
      <div className="mb-12">
        <p className="text-zinc-500 text-sm capitalize">{dateLabel}</p>
        <h1 className="text-4xl md:text-5xl font-serif italic mt-2 leading-tight">
          Hoje você está sendo{' '}
          <span className="text-violet-400">{percent}%</span>{' '}
          quem quer ser
        </h1>
        <p className="text-zinc-500 text-sm mt-3">
          {completedCount} de {totalHabits} {totalHabits === 1 ? 'hábito completo' : 'hábitos completos'}
        </p>

        {/* BARRA DE PROGRESSO */}
        <div className="mt-6 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* HÁBITOS AGRUPADOS POR IDENTIDADE */}
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
    </main>
  )
}

// ===== Helpers de data =====
// Gera uma "chave" no formato YYYY-MM-DD pra um dia
function todayKeyFor(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Pega quantas vezes um hábito foi marcado num dia específico
function getCount(completions, habitId, dateKey) {
  return completions[habitId]?.[dateKey] || 0
}

export default HomePage