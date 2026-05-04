import { useState } from 'react'

const COLORS = [
  '#a855f7', '#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#ec4899',
]

function NewIdentityModal({ identity, onClose, onSave }) {
  const isEditing = !!identity
  const [name, setName] = useState(identity?.name || '')
  const [color, setColor] = useState(identity?.color || COLORS[0])

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), color })
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-violet-400 text-xs uppercase tracking-widest mb-2">
          {isEditing ? 'Editar identidade' : 'Nova identidade'}
        </p>
        <h2 className="text-3xl font-serif italic mb-1">
          {isEditing ? 'Refine quem você quer ser' : 'Quem você quer ser?'}
        </h2>
        <p className="text-zinc-500 text-sm mb-8">
          Escreva como uma afirmação no presente.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: uma pessoa saudável"
            autoFocus
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
          />

          <div className="mt-6">
            <p className="text-zinc-400 text-sm mb-3">Cor</p>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-all ${
                    color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-8">
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
              {isEditing ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewIdentityModal