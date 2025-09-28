'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export default function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  return (
    <motion.div 
      className="flex flex-wrap gap-3 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {tags.map((tag, index) => (
        <motion.button
          key={tag}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.4,
            delay: 0.6 + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTagChange(tag)}
          className={cn(
            "px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 btn-press-effect",
            "border border-secondary hover:border-tertiary",
            activeTag === tag
              ? "bg-blue-600 text-white border-blue-600 shadow-lg"
              : "bg-secondary text-secondary hover:text-primary hover:shadow-md"
          )}
        >
          {tag}
        </motion.button>
      ))}
    </motion.div>
  )
}