import { createContext, useContext, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ToastContext = createContext(null)

let toastIdCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastIdCounter
    setToasts((prev) => [...prev, { id, message, type }])

    // Remove o toast após 3 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const toast = {
    success: (message) => showToast(message, 'success'),
    info: (message) => showToast(message, 'info'),
    error: (message) => showToast(message, 'error'),
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Container dos toasts no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`pointer-events-auto px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md min-w-[260px] ${
                t.type === 'success'
                  ? 'bg-zinc-900/90 border-violet-500/30 text-white'
                  : t.type === 'error'
                  ? 'bg-zinc-900/90 border-red-500/30 text-white'
                  : 'bg-zinc-900/90 border-zinc-700 text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
                </span>
                <p className="text-sm">{t.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// Hook pra consumir o toast em qualquer componente
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast precisa estar dentro de <ToastProvider>')
  }
  return ctx
}