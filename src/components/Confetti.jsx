import { motion } from 'framer-motion'

const COLORS = ['#a855f7', '#c084fc', '#d8b4fe', '#7c3aed', '#a78bfa']
const PARTICLE_COUNT = 24

/**
 * Explosão de partículas a partir do centro.
 * Cada partícula voa em direção aleatória, gira e some.
 */
function Confetti() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    // Distribui as partículas em ângulos diferentes (360º / N)
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
    // Distância aleatória entre 80 e 180 pixels
    const distance = 80 + Math.random() * 100
    const x = Math.cos(angle) * distance
    const y = Math.sin(angle) * distance
    const rotate = (Math.random() - 0.5) * 720 // até 2 voltas em qualquer direção
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]
    const size = 6 + Math.random() * 6 // 6 a 12px
    const delay = Math.random() * 0.1

    return { id: i, x, y, rotate, color, size, delay }
  })

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            opacity: 0,
            rotate: p.rotate,
            scale: 0.4,
          }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  )
}

export default Confetti