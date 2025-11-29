'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

const StarField = () => {
  const stars = useMemo(() => (
    Array.from({ length: 15 }).map((_, index) => ({
      id: index,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3,
    }))
  ), [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{ opacity: [star.opacity, 1, star.opacity], scale: [1, 1.5, 1] }}
          transition={{ duration: star.duration * 2, repeat: Infinity, ease: 'easeInOut', delay: star.delay }}
        />
      ))}
    </div>
  )
}

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-[#31326f] via-[#28295c] to-[#1f2048]">
      <StarField />

      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-[#a8fbd3] rounded-full mix-blend-screen blur-[40px] opacity-30"
        animate={{ x: [0, 50, -25, 0], y: [0, -25, 25, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute top-[20%] right-[-20%] w-[100vw] h-[80vw] bg-[#4fb7b3] rounded-full mix-blend-screen blur-[40px] opacity-20"
        animate={{ x: [0, -50, 25, 0], y: [0, 50, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[#637ab9] rounded-full mix-blend-screen blur-[40px] opacity-20"
        animate={{ x: [0, 75, -75, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
    </div>
  )
}
