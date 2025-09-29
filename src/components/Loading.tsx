'use client'

import { motion } from 'framer-motion'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="fixed inset-0 bg-primary flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center">
        {/* Google-style loading circles */}
        <div className="flex gap-3 mb-6">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`w-5 h-5 rounded-full ${
                index === 0 ? 'bg-blue-500' :
                index === 1 ? 'bg-red-500' :
                index === 2 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              animate={{
                y: [-25, 0, -25],
                scale: [1.3, 1, 1.3],
                rotate: [180, 360, 180],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                repeat: Infinity,
                ease: [0.175, 0.885, 0.32, 1.275]
              }}
            />
          ))}
        </div>

        <motion.span
          className="text-lg font-medium text-blue-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {message}
        </motion.span>
      </div>
    </div>
  )
}