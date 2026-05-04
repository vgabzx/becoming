import { motion } from 'framer-motion'

/**
 * Círculo de progresso animado em SVG.
 *
 * @param {number} percent - 0 a 100
 * @param {number} size - tamanho em pixels (largura/altura)
 * @param {number} strokeWidth - espessura do anel
 * @param {string} color - cor do anel preenchido (CSS color)
 * @param {string} trackColor - cor do anel de fundo
 */
function ProgressRing({
  percent = 0,
  size = 240,
  strokeWidth = 14,
  color = '#a855f7',
  trackColor = '#27272a',
  children,
}) {
  // Geometria do círculo
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const safePercent = Math.max(0, Math.min(100, percent))
  const dashOffset = circumference - (safePercent / 100) * circumference

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        {/* Anel de fundo (track) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />

        {/* Anel preenchido (progresso) */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Conteúdo no centro do anel */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  )
}

export default ProgressRing