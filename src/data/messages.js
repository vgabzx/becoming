/**
 * Sistema de mensagens contextuais do Becoming.
 *
 * Cada função recebe contexto (hora, progresso, identidades) e retorna
 * uma frase apropriada. O segredo: parecer escrito por uma pessoa, não
 * gerado por um app.
 */

// ===== Helpers =====

function getTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 6) return 'lateNight'
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  if (hour < 22) return 'evening'
  return 'night'
}

function pick(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// ===== SAUDAÇÕES PRINCIPAIS (tela do dia, topo) =====

const GREETINGS = {
  lateNight: [
    'Ainda acordado?',
    'A noite é longa.',
    'Madrugada silenciosa.',
  ],
  morning: [
    'Bom dia.',
    'O dia recomeça.',
    'Manhã nova, evidências novas.',
    'Hoje é mais um capítulo.',
  ],
  afternoon: [
    'Boa tarde.',
    'A tarde te encontra.',
    'Metade do dia, metade da prova.',
  ],
  evening: [
    'Boa noite.',
    'O dia se fecha.',
    'Hora de medir o que foi.',
  ],
  night: [
    'Já tá tarde.',
    'O dia praticamente acabou.',
    'Última chance de hoje.',
  ],
}

export function getGreeting() {
  return pick(GREETINGS[getTimeOfDay()])
}

// ===== SUBTÍTULOS DA HOMEPAGE (baseado em progresso) =====

export function getDayMessage({ percent, completed, total }) {
  if (total === 0) {
    return {
      title: 'Sua jornada ainda não começou.',
      subtitle: 'Crie uma identidade e o primeiro hábito que prova quem você quer ser.',
    }
  }

  if (percent === 100) {
    return {
      title: pick([
        'Hoje você foi quem quer ser.',
        'Dia completo. Identidade reforçada.',
        'Todas as evidências plantadas.',
      ]),
      subtitle: pick([
        'Cada dia desses constrói você.',
        'Repete amanhã, e amanhã, e amanhã.',
        'É assim que se torna alguém novo.',
      ]),
    }
  }

  if (completed === 0) {
    const time = getTimeOfDay()
    if (time === 'morning' || time === 'lateNight') {
      return {
        title: 'O dia te espera.',
        subtitle: 'Comece com uma evidência só. Pequena. A primeira é a mais importante.',
      }
    }
    if (time === 'afternoon') {
      return {
        title: 'A tarde ainda dá tempo.',
        subtitle: 'Uma evidência hoje vale mais que zero amanhã.',
      }
    }
    return {
      title: 'O dia está terminando.',
      subtitle: 'Vale a pena marcar o que ainda dá pra fazer?',
    }
  }

  if (percent >= 75) {
    return {
      title: `Quase lá. ${percent}% você.`,
      subtitle: `Faltam ${total - completed} ${total - completed === 1 ? 'evidência' : 'evidências'} pra fechar o dia.`,
    }
  }
  if (percent >= 50) {
    return {
      title: `${percent}% da pessoa que quer ser.`,
      subtitle: 'Mais da metade do caminho. Continua.',
    }
  }
  return {
    title: `Hoje você está sendo ${percent}% quem quer ser.`,
    subtitle: `${completed} ${completed === 1 ? 'evidência' : 'evidências'} de ${total}. O dia continua aberto.`,
  }
}

// ===== ESTADO VAZIO DA LISTA DE IDENTIDADES =====

export function getIdentitiesEmptyState() {
  return {
    quote: '"Você não se eleva ao nível dos seus objetivos. Você cai ao nível dos seus sistemas."',
    author: 'James Clear',
  }
}

// ===== SUBTITLE DA LISTA DE IDENTIDADES =====

export function getIdentitiesSubtitle(count) {
  if (count === 0) return 'Comece definindo quem você quer se tornar.'
  if (count === 1) return 'Uma pessoa em construção.'
  if (count === 2) return 'Duas pessoas em construção, ao mesmo tempo.'
  return `${count} pessoas em construção, ao mesmo tempo.`
}

// ===== FRASES PARA TELA DE DETALHE DA IDENTIDADE =====

export function getIdentityDetailMessage({ adherence, habitCount }) {
  if (habitCount === 0) {
    return {
      title: 'Toda identidade precisa de evidências.',
      subtitle: 'Comece com um hábito simples. Pequeno. Que você vai cumprir mesmo nos dias ruins.',
    }
  }

  if (adherence >= 80) {
    return {
      title: `Essa pessoa está virando você.`,
      subtitle: `${adherence}% de aderência este mês. Identidade fortalecida.`,
    }
  }

  if (adherence >= 50) {
    return {
      title: `Você está virando essa pessoa.`,
      subtitle: `${adherence}% de aderência este mês. Continua.`,
    }
  }

  if (adherence > 0) {
    return {
      title: `O começo é sempre o mais difícil.`,
      subtitle: `${adherence}% este mês. Cada dia conta mais que o anterior.`,
    }
  }

  return {
    title: `Aguardando a primeira evidência.`,
    subtitle: 'Sua identidade existe, mas ainda não há provas. Hoje pode ser o primeiro dia.',
  }
}

// ===== FRASES INSPIRACIONAIS ROTATIVAS (rodapé/cantos) =====

const INSPIRATIONAL = [
  'Cada hábito é um voto na pessoa que você quer ser.',
  'Você não decide o seu futuro. Você decide os seus hábitos. Eles decidem o seu futuro.',
  'Identidade não é o que você diz que é. É o que você faz.',
  'O presente é a única coisa real. Quem você está sendo agora é quem você está virando.',
  'Pequeno por dia. Grande no ano.',
  'Não se trata de ser perfeito. Se trata de aparecer.',
]

export function getInspirational() {
  return pick(INSPIRATIONAL)
}