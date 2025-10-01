'use client'

import React, { useRef, useEffect } from 'react'
import { gsap, animations } from '@/lib/gsap'

interface GSAPButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'glass'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  animationType?: 'press' | 'scale' | 'bounce' | 'glow'
}

const GSAPButton: React.FC<GSAPButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  animationType = 'press'
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Hover animation
    const handleMouseEnter = () => {
      if (disabled) return
      
      switch (animationType) {
        case 'glow':
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              scale: 1.1,
              opacity: 0.8,
              duration: 0.3,
              ease: "power2.out"
            })
          }
          gsap.to(button, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
          break
        case 'bounce':
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "back.out(1.7)"
          })
          break
        case 'scale':
          gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          })
          break
        default:
          gsap.to(button, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
      }
    }

    const handleMouseLeave = () => {
      if (disabled) return
      
      if (animationType === 'glow' && glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1,
          opacity: 0.4,
          duration: 0.3,
          ease: "power2.out"
        })
      }
      
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseDown = () => {
      if (disabled) return
      
      switch (animationType) {
        case 'bounce':
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out"
          })
          break
        case 'press':
          animations.buttonPress(button)
          break
        default:
          gsap.to(button, {
            scale: 0.98,
            duration: 0.1,
            ease: "power2.out"
          })
      }
    }

    const handleMouseUp = () => {
      if (disabled) return
      
      if (animationType !== 'press') {
        gsap.to(button, {
          scale: animationType === 'bounce' ? 1.05 : 1.02,
          duration: 0.2,
          ease: "back.out(1.7)"
        })
      }
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousedown', handleMouseDown)
    button.addEventListener('mouseup', handleMouseUp)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousedown', handleMouseDown)
      button.removeEventListener('mouseup', handleMouseUp)
    }
  }, [animationType, disabled])

  const getButtonClasses = () => {
    const baseClasses = 'relative overflow-hidden font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500',
      glass: 'glass-effect text-primary border border-secondary hover:bg-tertiary'
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-2xl'
    }

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={getButtonClasses()}
    >
      {animationType === 'glow' && (
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl opacity-40 scale-100 blur-sm"
          style={{ zIndex: -1 }}
        />
      )}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  )
}

export default GSAPButton