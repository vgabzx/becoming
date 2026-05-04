/**
 * Funções utilitárias pra calcular estatísticas dos hábitos.
 */

// Gera chave YYYY-MM-DD pra um Date
export function dateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// Cria uma Date no início do dia (00:00) a partir de uma chave YYYY-MM-DD
export function dateFromKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

// Verifica se um hábito foi completado num dia (atingiu a meta)
export function isCompletedOnDay(habit, completions, key) {
  const count = completions[habit.id]?.[key] || 0
  return count >= habit.target
}

/**
 * Calcula o streak atual: quantos dias seguidos (até hoje) o hábito
 * foi completado. Inclui hoje se completou; senão começa de ontem.
 */
export function currentStreak(habit, completions) {
  const today = new Date()
  let streak = 0
  const cursor = new Date(today)

  // Se hoje não foi completo, começa contando a partir de ontem
  if (!isCompletedOnDay(habit, completions, dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }

  // Anda pra trás enquanto encontrar dias completos
  while (isCompletedOnDay(habit, completions, dateKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
    // Trava de segurança (evita loop infinito em caso de bug)
    if (streak > 10000) break
  }

  return streak
}

/**
 * Calcula o melhor streak histórico do hábito.
 */
export function bestStreak(habit, completions) {
  const habitData = completions[habit.id] || {}
  const dates = Object.keys(habitData)
    .filter((key) => habitData[key] >= habit.target)
    .sort()

  if (dates.length === 0) return 0

  let best = 1
  let current = 1

  for (let i = 1; i < dates.length; i++) {
    const prev = dateFromKey(dates[i - 1])
    const curr = dateFromKey(dates[i])
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      current++
      best = Math.max(best, current)
    } else {
      current = 1
    }
  }

  return best
}

/**
 * Conta dias completos num intervalo (inclusive nas duas pontas).
 */
export function completedDaysInRange(habit, completions, startDate, endDate) {
  const habitData = completions[habit.id] || {}
  let count = 0
  const cursor = new Date(startDate)

  while (cursor <= endDate) {
    if ((habitData[dateKey(cursor)] || 0) >= habit.target) {
      count++
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return count
}

/**
 * Calcula % de aderência do hábito no mês corrente.
 */
export function monthlyAdherence(habit, completions) {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const daysSoFar = today.getDate()
  const completed = completedDaysInRange(habit, completions, start, today)
  return daysSoFar === 0 ? 0 : Math.round((completed / daysSoFar) * 100)
}

/**
 * Calcula % de aderência da identidade no mês (média dos hábitos).
 */
export function identityMonthlyAdherence(identity, completions) {
  const habits = identity.habits || []
  if (habits.length === 0) return 0
  const sum = habits.reduce((acc, h) => acc + monthlyAdherence(h, completions), 0)
  return Math.round(sum / habits.length)
}