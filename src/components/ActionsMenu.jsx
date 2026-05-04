import { useState, useEffect, useRef } from 'react'

/**
 * Menu dropdown com botão de 3 pontinhos.
 * actions: array de { label, onClick, destructive? }
 */
function ActionsMenu({ actions }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Fecha ao apertar ESC
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
    }
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
        className="w-8 h-8 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors flex items-center justify-center"
        aria-label="Abrir menu de ações"
      >
        <span className="text-lg leading-none">⋯</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-9 w-44 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl py-1 z-20 overflow-hidden">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsOpen(false)
                action.onClick()
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                action.destructive
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActionsMenu