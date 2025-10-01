'use client'

import React, { useEffect, useRef } from 'react'
import { useScrollAnimation, scrollAnimations } from '@/hooks/useScrollAnimations'
import { gsap } from '@/lib/gsap'

interface GSAPScrollSectionProps {
  children: React.ReactNode
  className?: string
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'staggerChildren' | 'rotateIn' | 'slideInFromBottom' | 'typewriter'
  delay?: number
  duration?: number
  stagger?: number
  trigger?: 'viewport' | 'hover' | 'click'
  once?: boolean
}

const GSAPScrollSection: React.FC<GSAPScrollSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeInUp',
  delay = 0,
  duration = 1,
  stagger = 0.1,
  trigger = 'viewport',
  once = true
}) => {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Use scroll animation hook for viewport trigger
  const scrollRef = useScrollAnimation(
    (element) => {
      const animation = scrollAnimations[animationType]
      if (animation) {
        const tween = animation(element)
        if (delay > 0) {
          tween.delay(delay)
        }
        if (duration !== 1) {
          tween.duration(duration)
        }
        return tween
      }
      return gsap.timeline()
    },
    [animationType, delay, duration],
    {
      start: 'top 85%',
      end: 'bottom 15%'
    }
  )

  // Handle non-viewport triggers
  useEffect(() => {
    if (trigger === 'viewport') return
    
    const element = sectionRef.current
    if (!element) return

    const handleTrigger = () => {
      const animation = scrollAnimations[animationType]
      if (animation) {
        const tween = animation(element)
        if (delay > 0) {
          tween.delay(delay)
        }
        if (duration !== 1) {
          tween.duration(duration)
        }
      }
    }

    if (trigger === 'hover') {
      element.addEventListener('mouseenter', handleTrigger)
      return () => element.removeEventListener('mouseenter', handleTrigger)
    } else if (trigger === 'click') {
      element.addEventListener('click', handleTrigger)
      return () => element.removeEventListener('click', handleTrigger)
    }
  }, [trigger, animationType, delay, duration])

  return (
    <div
      ref={trigger === 'viewport' ? scrollRef as any : sectionRef}
      className={className}
    >
      {children}
    </div>
  )
}

export default GSAPScrollSection