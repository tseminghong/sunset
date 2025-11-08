'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface TransitionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  id?: string
}

export default function TransitionSection({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  id
}: TransitionSectionProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: 'power2.out'
      }
    }
  }

  return (
    <motion.section
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  )
}
