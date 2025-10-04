'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { gsap } from '@/lib/gsap'

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder?: string
}

// Inner component that only renders after portal is mounted
function SearchBarContent({
  searchTerm,
  onSearchChange,
  placeholder
}: SearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 1.2,
          ease: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
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
    </div>
  )
}

export default function SearchBar(props: SearchBarProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setPortalTarget(document.body)
  }, [])

  if (!portalTarget) {
    return null
  }

  return createPortal(<SearchBarContent {...props} />, portalTarget)
}