export const CATEGORIES = {
  physical: { label: 'Saúde física', emoji: '💪', keywords: ['saudável', 'corpo', 'forte', 'forma', 'atleta', 'fit', 'esporte'] },
  mental: { label: 'Saúde mental', emoji: '🧘', keywords: ['calmo', 'tranquilo', 'mental', 'mente', 'paz', 'consciente'] },
  learning: { label: 'Aprendizado', emoji: '📚', keywords: ['aprendiz', 'estudante', 'leitor', 'curioso', 'sábio', 'conhecimento'] },
  productivity: { label: 'Produtividade', emoji: '⚡', keywords: ['produtivo', 'foco', 'organizado', 'profissional', 'eficiente'] },
  creative: { label: 'Criatividade', emoji: '🎨', keywords: ['criativo', 'artista', 'escritor', 'músico', 'criador'] },
  relationships: { label: 'Relacionamentos', emoji: '💞', keywords: ['amigo', 'família', 'pai', 'mãe', 'filho', 'parceiro', 'presente'] },
  finance: { label: 'Finanças', emoji: '💰', keywords: ['financeiro', 'rico', 'investidor', 'econômico', 'consciente'] },
  break: { label: 'Quebrar hábitos', emoji: '🚫', keywords: ['livre', 'sóbrio', 'limpo', 'desconectado'] },
}

export const HABIT_TEMPLATES = [
  // Saúde física
  { id: 'water', category: 'physical', emoji: '💧', name: 'Beber água', frequency: 'daily', target: 8, unit: 'copos' },
  { id: 'walk', category: 'physical', emoji: '🚶', name: 'Caminhar', frequency: 'daily', target: 30, unit: 'min' },
  { id: 'gym', category: 'physical', emoji: '🏋️', name: 'Treinar', frequency: 'weekly', target: 4, unit: 'vezes' },
  { id: 'sleep', category: 'physical', emoji: '😴', name: 'Dormir 8 horas', frequency: 'daily', target: 1, unit: 'vez' },
  { id: 'stretch', category: 'physical', emoji: '🤸', name: 'Alongar', frequency: 'daily', target: 10, unit: 'min' },
  { id: 'fruits', category: 'physical', emoji: '🍎', name: 'Comer frutas', frequency: 'daily', target: 2, unit: 'porções' },

  // Saúde mental
  { id: 'meditate', category: 'mental', emoji: '🧘', name: 'Meditar', frequency: 'daily', target: 10, unit: 'min' },
  { id: 'journal', category: 'mental', emoji: '📓', name: 'Escrever no diário', frequency: 'daily', target: 1, unit: 'vez' },
  { id: 'gratitude', category: 'mental', emoji: '🙏', name: 'Gratidão (3 coisas)', frequency: 'daily', target: 3, unit: 'itens' },
  { id: 'breath', category: 'mental', emoji: '🌬️', name: 'Respiração consciente', frequency: 'daily', target: 5, unit: 'min' },
  { id: 'nature', category: 'mental', emoji: '🌳', name: 'Tempo na natureza', frequency: 'weekly', target: 2, unit: 'vezes' },

  // Aprendizado
  { id: 'read', category: 'learning', emoji: '📖', name: 'Ler', frequency: 'daily', target: 30, unit: 'min' },
  { id: 'study', category: 'learning', emoji: '✏️', name: 'Estudar', frequency: 'daily', target: 1, unit: 'hora' },
  { id: 'language', category: 'learning', emoji: '🌍', name: 'Praticar idioma', frequency: 'daily', target: 15, unit: 'min' },
  { id: 'podcast', category: 'learning', emoji: '🎧', name: 'Ouvir podcast', frequency: 'weekly', target: 3, unit: 'episódios' },
  { id: 'course', category: 'learning', emoji: '🎓', name: 'Aula do curso', frequency: 'daily', target: 1, unit: 'aula' },

  // Produtividade
  { id: 'plan', category: 'productivity', emoji: '📋', name: 'Planejar o dia', frequency: 'daily', target: 1, unit: 'vez' },
  { id: 'deepwork', category: 'productivity', emoji: '🎯', name: 'Deep work', frequency: 'daily', target: 2, unit: 'horas' },
  { id: 'inbox', category: 'productivity', emoji: '📨', name: 'Inbox zero', frequency: 'daily', target: 1, unit: 'vez' },
  { id: 'review', category: 'productivity', emoji: '🔄', name: 'Revisão semanal', frequency: 'weekly', target: 1, unit: 'vez' },

  // Criatividade
  { id: 'write', category: 'creative', emoji: '✍️', name: 'Escrever', frequency: 'daily', target: 500, unit: 'palavras' },
  { id: 'draw', category: 'creative', emoji: '🎨', name: 'Desenhar', frequency: 'daily', target: 20, unit: 'min' },
  { id: 'music', category: 'creative', emoji: '🎸', name: 'Praticar instrumento', frequency: 'daily', target: 30, unit: 'min' },
  { id: 'photo', category: 'creative', emoji: '📷', name: 'Fotografar', frequency: 'weekly', target: 3, unit: 'vezes' },

  // Relacionamentos
  { id: 'family', category: 'relationships', emoji: '👨‍👩‍👧', name: 'Ligar pra família', frequency: 'weekly', target: 2, unit: 'vezes' },
  { id: 'date', category: 'relationships', emoji: '💕', name: 'Tempo de qualidade', frequency: 'weekly', target: 1, unit: 'vez' },
  { id: 'friend', category: 'relationships', emoji: '👥', name: 'Encontrar um amigo', frequency: 'weekly', target: 1, unit: 'vez' },
  { id: 'message', category: 'relationships', emoji: '💌', name: 'Mensagem carinhosa', frequency: 'daily', target: 1, unit: 'vez' },

  // Finanças
  { id: 'expenses', category: 'finance', emoji: '📊', name: 'Anotar gastos', frequency: 'daily', target: 1, unit: 'vez' },
  { id: 'no-delivery', category: 'finance', emoji: '🍱', name: 'Não pedir delivery', frequency: 'daily', target: 1, unit: 'dia' },
  { id: 'invest', category: 'finance', emoji: '📈', name: 'Investir', frequency: 'weekly', target: 1, unit: 'aporte' },
  { id: 'no-impulse', category: 'finance', emoji: '🛍️', name: 'Sem compra por impulso', frequency: 'daily', target: 1, unit: 'dia' },

  // Quebrar hábitos
  { id: 'no-smoke', category: 'break', emoji: '🚭', name: 'Não fumar', frequency: 'daily', target: 1, unit: 'dia' },
  { id: 'no-alcohol', category: 'break', emoji: '🚱', name: 'Sem álcool', frequency: 'daily', target: 1, unit: 'dia' },
  { id: 'less-social', category: 'break', emoji: '📵', name: 'Menos redes sociais', frequency: 'daily', target: 30, unit: 'min máx' },
  { id: 'no-sugar', category: 'break', emoji: '🍬', name: 'Sem açúcar refinado', frequency: 'daily', target: 1, unit: 'dia' },
]

// Função que sugere categorias baseado no nome da identidade
export function getSuggestedCategories(identityName) {
  const name = identityName.toLowerCase()
  const matches = []

  for (const [key, cat] of Object.entries(CATEGORIES)) {
    if (cat.keywords.some((keyword) => name.includes(keyword))) {
      matches.push(key)
    }
  }

  return matches
}