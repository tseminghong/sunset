'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Search } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import dynamic from 'next/dynamic'
import { useBrowserDetection } from '@/hooks/useBrowserDetection'

// Dynamically import LiquidGlass to avoid SSR issues
const LiquidGlass = dynamic(
  () => import('liquid-glass-react').then(mod => mod.default || mod),
  {
    ssr: false,
    loading: () => <div className="pointer-events-auto w-full max-w-md glass-effect rounded-full relative" style={{ height: '56px' }} />
  }
)

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
  const { isSafari, isIOS, browserName } = useBrowserDetection()
  
  // Show liquid glass for Safari/iOS users
  const showLiquidGlass = isSafari || isIOS
  
  // Debug: Log browser detection in development
  useEffect(() => {
    console.log('[SearchBar] Browser:', browserName, 'isSafari:', isSafari, 'isIOS:', isIOS, 'showLiquidGlass:', showLiquidGlass)
  }, [browserName, isSafari, isIOS, showLiquidGlass])

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

  const searchInput = (
    <>
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-tertiary z-10">
        <Search className="h-5 w-5" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent border-none outline-none pl-14 pr-6 py-4 text-primary placeholder-tertiary font-medium"
      />
    </>
  )

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed left-4 right-4 z-40 flex flex-col items-center gap-2"
      style={{ bottom: `calc(1.5rem + env(safe-area-inset-bottom, 0px))` }}
    >
      {/* Debug indicator - remove after testing */}
      {process.env.NODE_ENV === 'development' && (
        <div className="pointer-events-auto text-xs px-3 py-1 rounded-full bg-black/80 text-white">
          {showLiquidGlass ? '🍎 Safari Mode (Liquid Glass)' : `🌐 ${browserName} Mode (Normal)`}
        </div>
      )}
      {showLiquidGlass ? (
        <LiquidGlass
          className="pointer-events-auto w-full max-w-md relative btn-press-effect"
          cornerRadius={999}
          blurAmount={0.1}
          saturation={140}
          elasticity={0.25}
          displacementScale={50}
          padding="0"
        >
          <div className="relative w-full">
            {searchInput}
          </div>
        </LiquidGlass>
      ) : (
        <div className="pointer-events-auto w-full max-w-md glass-effect rounded-full relative btn-press-effect">
          {searchInput}
        </div>
      )}
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