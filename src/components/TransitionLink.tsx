'use client'

import React from 'react'
import Link from 'next/link'
import { usePageTransition } from '@/hooks/usePageTransition'

interface TransitionLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  replace?: boolean
  prefetch?: boolean
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className = '',
  onClick,
  replace = false,
  prefetch = true
}) => {
  const { navigate, replace: replaceRoute, preload } = usePageTransition()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Call the provided onClick handler first
    onClick?.()

    try {
      if (replace) {
        await replaceRoute(href)
      } else {
        await navigate(href)
      }
    } catch (error) {
      console.error('Navigation failed:', error)
      // Fallback to regular navigation
      window.location.href = href
    }
  }

  const handleMouseEnter = () => {
    if (prefetch) {
      preload(href)
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      aria-label={typeof children === 'string' ? children : undefined}
    >
      {children}
    </Link>
  )
}

export default TransitionLink