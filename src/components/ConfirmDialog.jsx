function ConfirmDialog({ title, description, confirmLabel = 'Excluir', onCancel, onConfirm, destructive = true }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${
              destructive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-violet-500 hover:bg-violet-600 text-white'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog