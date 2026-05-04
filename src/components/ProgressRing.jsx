import { motion } from 'framer-motion'

function ProgressRing({
  percent = 0,
  size = 240,
  strokeWidth = 14,
  color = '#a855f7',
  trackColor = '#27272a',
  isComplete = false,
  children,
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const safePercent = Math.max(0, Math.min(100, percent))
  const dashOffset = circumference - (safePercent / 100) * circumference

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={
        isComplete
          ? {
              scale: [1, 1.04, 1],
              filter: [
                'drop-shadow(0 0 0px rgba(168, 85, 247, 0))',
                'drop-shadow(0 0 32px rgba(168, 85, 247, 0.6))',
                'drop-shadow(0 0 24px rgba(168, 85, 247, 0.4))',
              ],
            }
          : {
              scale: 1,
              filter: 'drop-shadow(0 0 0px rgba(168, 85, 247, 0))',
            }
      }
      transition={{ duration: 2, ease: 'easeOut' }}
    >
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {children}
      </div>
    </motion.div>
  )
}

export default ProgressRing