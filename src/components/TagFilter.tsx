'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { combineRefs, useGsapHoverAnimation, useGsapMountAnimation } from '@/hooks/useGsapMotion'

interface TagButtonProps {
  tag: string
  index: number
  active: boolean
  onClick: () => void
}

const TagButton = ({ tag, index, active, onClick }: TagButtonProps) => {
  const mountRef = useGsapMountAnimation<HTMLButtonElement>({
    from: { opacity: 0, scale: 0.8, y: 20 },
    to: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 0.4,
      delay: 0.6 + index * 0.1,
      ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }
  })

  const hoverRef = useGsapHoverAnimation<HTMLButtonElement>({
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    pressIn: { scale: 0.95 },
    transition: { duration: 0.2, ease: 'power2.out' }
  })

  const buttonRef = useMemo(() => combineRefs(mountRef, hoverRef), [mountRef, hoverRef])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn(
        'px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 btn-press-effect',
        'border border-secondary hover:border-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        active
          ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
          : 'bg-secondary text-secondary hover:text-primary hover:shadow-md'
      )}
    >
      {tag}
    </button>
  )
}

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onTagChange: (tag: string) => void
}

export default function TagFilter({ tags, activeTag, onTagChange }: TagFilterProps) {
  const containerRef = useGsapMountAnimation<HTMLDivElement>({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2, ease: 'power2.out' }
  })

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap gap-3 justify-center"
    >
      {tags.map((tag, index) => (
        <TagButton
          key={tag}
          tag={tag}
          index={index}
          active={activeTag === tag}
          onClick={() => onTagChange(tag)}
        />
      ))}
    </div>
  )
}