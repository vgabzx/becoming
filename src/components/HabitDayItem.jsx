import { motion } from 'framer-motion'

function HabitDayItem({ habit, count, onIncrement, onDecrement }) {
  const isComplete = count >= habit.target
  const progress = Math.min((count / habit.target) * 100, 100)

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all ${
        isComplete
          ? 'bg-violet-500/10 border-violet-500/40'
          : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Barra de progresso de fundo (sutil) */}
      {!isComplete && progress > 0 && (
        <div
          className="absolute inset-y-0 left-0 bg-violet-500/5"
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="relative flex items-center justify-between p-4 gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-2xl flex-shrink-0">{habit.emoji || '✨'}</span>
          <div className="min-w-0">
            <p className={`font-medium truncate ${isComplete ? 'text-violet-200' : 'text-white'}`}>
              {habit.name}
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              {count} de {habit.target} {habit.unit}
              {isComplete && <span className="text-violet-400 ml-2">· completo ✓</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {count > 0 && (
            <button
              onClick={onDecrement}
              className="w-9 h-9 rounded-full border border-zinc-800 hover:border-zinc-700 text-zinc-500 hover:text-white transition-colors flex items-center justify-center"
              aria-label="Desmarcar"
            >
              −
            </button>
          )}

          <motion.button
            onClick={onIncrement}
            disabled={isComplete}
            whileTap={{ scale: 0.9 }}
            animate={isComplete ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`w-9 h-9 rounded-full font-medium transition-colors flex items-center justify-center ${
              isComplete
                ? 'bg-violet-500/30 text-violet-300 cursor-default'
                : 'bg-violet-500 hover:bg-violet-600 text-white'
            }`}
            aria-label="Marcar"
          >
            {isComplete ? '✓' : '+'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default HabitDayItem