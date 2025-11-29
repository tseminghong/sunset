'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      mouseX.set(event.clientX)
      mouseY.set(event.clientY)

      const target = event.target as HTMLElement
      const clickable = target.closest('button') || target.closest('a') || target.closest('[data-hover="true"]')
      setIsHovering(Boolean(clickable))
    }

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] flex items-center justify-center"
        style={{ width: 80, height: 80 }}
        animate={{ scale: isHovering ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <motion.span
          className="text-black font-black uppercase tracking-widest text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
