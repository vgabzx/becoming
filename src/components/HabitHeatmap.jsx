import { dateKey, dateFromKey } from '../utils/habitStats'

function HabitHeatmap({ habit, completions }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Volta 364 dias = 365 dias contando hoje
  const start = new Date(today)
  start.setDate(start.getDate() - 364)

  // Avança a partir do start até bater num domingo (início da semana)
  // Assim a primeira coluna sempre começa num domingo, alinhando os dias da semana
  while (start.getDay() !== 0) {
    start.setDate(start.getDate() - 1)
  }

  const habitData = completions[habit.id] || {}

  // Gera array de semanas, cada semana = array de 7 dias
  const weeks = []
  const cursor = new Date(start)

  while (cursor <= today) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const key = dateKey(cursor)
      const inRange = cursor <= today
      const count = inRange ? (habitData[key] || 0) : 0
      const ratio = Math.min(count / habit.target, 1)
      week.push({
        key,
        date: new Date(cursor),
        count,
        ratio,
        inRange,
      })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }

  // Retorna a classe Tailwind baseada na intensidade
  function getCellClass(cell) {
    if (!cell.inRange) return 'bg-transparent'
    if (cell.ratio === 0) return 'bg-zinc-900 border border-zinc-800/50'
    if (cell.ratio < 0.34) return 'bg-violet-500/25'
    if (cell.ratio < 0.67) return 'bg-violet-500/55'
    if (cell.ratio < 1) return 'bg-violet-500/80'
    return 'bg-violet-400'
  }

  // Tooltip: data + status
  function getTooltip(cell) {
    const dateStr = cell.date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    if (!cell.inRange) return ''
    if (cell.count === 0) return `${dateStr} — sem registro`
    if (cell.count >= habit.target) {
      return `${dateStr} — completo (${cell.count}/${habit.target} ${habit.unit})`
    }
    return `${dateStr} — ${cell.count}/${habit.target} ${habit.unit}`
  }

  // Labels dos meses no topo (mostra quando o mês muda na primeira linha da semana)
  const monthLabels = []
  let lastMonth = -1
  weeks.forEach((week, i) => {
    const firstDay = week[0]
    if (firstDay.inRange && firstDay.date.getMonth() !== lastMonth) {
      lastMonth = firstDay.date.getMonth()
      monthLabels.push({
        index: i,
        label: firstDay.date.toLocaleDateString('pt-BR', { month: 'short' }),
      })
    }
  })

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-medium">Últimos 365 dias</h3>
          <p className="text-zinc-500 text-xs mt-0.5">
            cada quadrado é um dia · intensidade indica progresso
          </p>
        </div>
        <Legend />
      </div>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-block min-w-full">
          {/* Labels dos meses */}
          <div className="flex gap-[3px] mb-1 ml-7 text-[10px] text-zinc-600">
            {weeks.map((_, i) => {
              const label = monthLabels.find((m) => m.index === i)
              return (
                <div key={i} className="w-3 flex-shrink-0">
                  {label?.label}
                </div>
              )
            })}
          </div>

          <div className="flex gap-[3px]">
            {/* Labels dos dias da semana (à esquerda) */}
            <div className="flex flex-col gap-[3px] mr-1 text-[10px] text-zinc-600">
              {['', 'seg', '', 'qua', '', 'sex', ''].map((d, i) => (
                <div key={i} className="h-3 flex items-center">
                  {d}
                </div>
              ))}
            </div>

            {/* Grid de células */}
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {week.map((cell) => (
                  <div
                    key={cell.key}
                    title={getTooltip(cell)}
                    className={`w-3 h-3 rounded-sm ${getCellClass(cell)} transition-colors hover:ring-1 hover:ring-violet-300 cursor-pointer`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Legend() {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
      <span>menos</span>
      <div className="w-3 h-3 rounded-sm bg-zinc-900 border border-zinc-800/50" />
      <div className="w-3 h-3 rounded-sm bg-violet-500/25" />
      <div className="w-3 h-3 rounded-sm bg-violet-500/55" />
      <div className="w-3 h-3 rounded-sm bg-violet-500/80" />
      <div className="w-3 h-3 rounded-sm bg-violet-400" />
      <span>mais</span>
    </div>
  )
}

export default HabitHeatmap