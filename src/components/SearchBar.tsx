'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder?: string
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = "Search resources..."
}: SearchBarProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalTarget(document.body)
  }, [])

  if (!portalTarget) {
    return null
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 1,
        ease: [0.175, 0.885, 0.32, 1.275],
        delay: 1.2
      }}
      className="pointer-events-none fixed left-4 right-4 z-40 flex justify-center"
      style={{ bottom: `calc(1.5rem + env(safe-area-inset-bottom, 0px))` }}
    >
      <div className="pointer-events-auto w-full max-w-md glass-effect rounded-full relative btn-press-effect">
        <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-tertiary">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none pl-14 pr-6 py-4 text-primary placeholder-tertiary font-medium"
        />
      </div>
    </motion.div>
  )

  return createPortal(content, portalTarget)
}