import { useState } from 'react'
import { CATEGORIES, HABIT_TEMPLATES, getSuggestedCategories } from '../data/habitTemplates'

function NewHabitModal({ identity, habit, onClose, onSave }) {
  const isEditing = !!habit

  const [step, setStep] = useState(isEditing ? 'edit' : 'browse')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const suggested = getSuggestedCategories(identity.name)
  const initialCategory = suggested[0] || 'physical'
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const [name, setName] = useState(habit?.name || '')
  const [emoji, setEmoji] = useState(habit?.emoji || '✨')
  const [frequency, setFrequency] = useState(habit?.frequency || 'daily')
  const [target, setTarget] = useState(habit?.target || 1)
  const [unit, setUnit] = useState(habit?.unit || 'vez')

  function pickTemplate(template) {
    setSelectedTemplate(template)
    setName(template.name)
    setEmoji(template.emoji)
    setFrequency(template.frequency)
    setTarget(template.target)
    setUnit(template.unit)
    setStep('edit')
  }

  function startFromScratch() {
    setSelectedTemplate(null)
    setName('')
    setEmoji('✨')
    setFrequency('daily')
    setTarget(1)
    setUnit('vez')
    setStep('edit')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({
      name: name.trim(),
      emoji,
      frequency,
      target: Number(target),
      unit: unit.trim() || 'vez',
    })
  }

  const filteredTemplates = HABIT_TEMPLATES.filter((t) => t.category === activeCategory)

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'browse' && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">
                Nova evidência
              </p>
              <h2 className="text-2xl font-serif italic">
                Escolha um hábito que prove essa identidade
              </h2>
              {suggested.length > 0 && (
                <p className="text-zinc-500 text-sm mt-2">
                  Sugerimos categorias com base em "{identity.name}".
                </p>
              )}
            </div>

            <div className="px-6 pt-4 pb-3 border-b border-zinc-800">
              <div className="flex flex-wrap gap-2">
                {Object.entries(CATEGORIES).map(([key, cat]) => {
                  const isSuggested = suggested.includes(key)
                  const isActive = activeCategory === key
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`px-3 py-2 rounded-full text-sm whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-violet-500 text-white'
                          : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
                      }`}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                      {isSuggested && !isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => pickTemplate(template)}
                    className="text-left bg-zinc-950 hover:bg-zinc-800/70 border border-zinc-800 hover:border-violet-500/50 rounded-xl p-4 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{template.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white">{template.name}</p>
                        <p className="text-zinc-500 text-xs mt-1">
                          {template.frequency === 'daily' ? 'todo dia' : 'semanal'} · {template.target} {template.unit}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
              <button
                onClick={startFromScratch}
                className="text-zinc-500 hover:text-white text-sm transition-colors"
              >
                + criar do zero
              </button>
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-white text-sm transition-colors"
              >
                cancelar
              </button>
            </div>
          </div>
        )}

        {step === 'edit' && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{emoji}</span>
                <div>
                  <p className="text-violet-400 text-xs uppercase tracking-widest">
                    {isEditing ? 'Editar hábito' : 'Ajustar hábito'}
                  </p>
                  <p className="text-zinc-500 text-sm mt-0.5">
                    {isEditing ? 'mude o que precisar' : 'personalize antes de criar'}
                  </p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setStep('browse')}
                  className="text-zinc-500 hover:text-white text-sm transition-colors"
                >
                  ← voltar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Hábito</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-zinc-400 text-sm mb-2 block">Frequência</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('daily')}
                    className={`py-3 rounded-xl border transition-colors ${
                      frequency === 'daily'
                        ? 'border-violet-500 bg-violet-500/10 text-white'
                        : 'border-zinc-800 text-zinc-500 hover:text-white'
                    }`}
                  >
                    Todo dia
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    className={`py-3 rounded-xl border transition-colors ${
                      frequency === 'weekly'
                        ? 'border-violet-500 bg-violet-500/10 text-white'
                        : 'border-zinc-800 text-zinc-500 hover:text-white'
                    }`}
                  >
                    Semanal
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Meta</label>
                  <input
                    type="number"
                    min="1"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 text-sm mb-2 block">Unidade</label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Salvar' : 'Criar hábito'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewHabitModal