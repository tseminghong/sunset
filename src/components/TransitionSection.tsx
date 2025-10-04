'use client'

import { ReactNode } from 'react'
import { useIntersectionAnimation } from '@/hooks/useScrollAnimations'
import { gsap } from '@/lib/gsap'

interface TransitionSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  id?: string
}

export default function TransitionSection({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 50,
  id
}: TransitionSectionProps) {
  const sectionRef = useIntersectionAnimation<HTMLElement>((element) => {
    const from: gsap.TweenVars = { opacity: 0 }
    const to: gsap.TweenVars = { opacity: 1, duration, delay, ease: 'power2.out' }

    switch (direction) {
      case 'up':
        from.y = distance
        to.y = 0
        break
      case 'down':
        from.y = -distance
        to.y = 0
        break
      case 'left':
        from.x = distance
        to.x = 0
        break
      case 'right':
        from.x = -distance
        to.x = 0
        break
      default:
        from.y = distance
        to.y = 0
    }

    gsap.fromTo(element, from, to)
  })

  return (
    <section
      ref={sectionRef}
      id={id}
      className={className}
    >
      {children}
    </section>
  )
}
