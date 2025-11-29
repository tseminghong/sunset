'use client'

import { motion } from 'framer-motion'

interface GradientTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
}

export default function GradientText({ text, as: Component = 'span', className = '' }: GradientTextProps) {
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-white via-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-white bg-[length:200%_auto] bg-clip-text text-transparent"
        animate={{ backgroundPosition: ['0% center', '200% center'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {text}
      </motion.span>

      <span
        className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 opacity-50"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {text}
      </span>

      <span
        className="absolute inset-0 -z-10 block bg-gradient-to-r from-[#a8fbd3] via-[#4fb7b3] via-[#637ab9] to-[#a8fbd3] bg-[length:200%_auto] bg-clip-text text-transparent blur-xl md:blur-2xl opacity-40"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        {text}
      </span>
    </Component>
  )
}
