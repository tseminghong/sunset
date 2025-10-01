'use client'

import React from 'react'
import Link from 'next/link'
import { useGSAPPageTransition } from '@/hooks/useGSAPPageTransition'

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
  const { navigate, replace: replaceRoute, preload } = useGSAPPageTransition()

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Call the provided onClick handler first
    onClick?.()

    try {
      if (replace) {
        await replaceRoute(href, {
          animationType: 'fade'
        })
      } else {
        await navigate(href, {
          animationType: 'fade'
        })
      }
    } catch (error) {
      console.error('GSAP Navigation failed:', error)
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