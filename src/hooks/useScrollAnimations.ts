'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from '@/lib/gsap'

// Interface for scroll animation options
export interface ScrollAnimationOptions {
  trigger?: string | Element
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  snap?: boolean | number | object
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  markers?: boolean
  refreshPriority?: number
}

// Hook for scroll-triggered animations
export const useScrollAnimation = (
  animationFunction: (element: Element) => gsap.core.Timeline | gsap.core.Tween,
  dependencies: any[] = [],
  options: ScrollAnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null)

  useEffect(() => {
    let ScrollTrigger: any

    const initScrollTrigger = async () => {
      // Dynamically import ScrollTrigger
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      ScrollTrigger = ST
      gsap.registerPlugin(ScrollTrigger)

      if (!elementRef.current) return

      const element = elementRef.current
      const animation = animationFunction(element)

      // Create ScrollTrigger
      const scrollTrigger = ScrollTrigger.create({
        trigger: options.trigger || element,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub || false,
        pin: options.pin || false,
        snap: options.snap || false,
        markers: options.markers || false,
        refreshPriority: options.refreshPriority || 0,
        animation: animation,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      })

      animationRef.current = animation

      return () => {
        scrollTrigger.kill()
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    }

    const cleanup = initScrollTrigger()

    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.())
    }
  }, dependencies)

  return elementRef
}

// Predefined scroll animations
export const scrollAnimations = {
  fadeInUp: (element: Element) => {
    return gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out"
      }
    )
  },

  fadeInLeft: (element: Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }
    )
  },

  fadeInRight: (element: Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out"
      }
    )
  },

  scaleIn: (element: Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    )
  },

  staggerChildren: (element: Element) => {
    const children = element.children
    return gsap.fromTo(children,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }
    )
  },

  parallaxBackground: (element: Element) => {
    return gsap.to(element, {
      yPercent: -50,
      ease: "none"
    })
  },

  rotateIn: (element: Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        rotation: -15,
        scale: 0.9
      },
      {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    )
  },

  slideInFromBottom: (element: Element) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    )
  },

  typewriter: (element: Element) => {
    const text = element.textContent || ''
    element.innerHTML = ''
    
    const tl = gsap.timeline()
    
    // Add each character wrapped in a span
    text.split('').forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.opacity = '0'
      element.appendChild(span)
    })

    // Animate each character
    const chars = element.querySelectorAll('span')
    tl.to(chars, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.03,
      ease: "none"
    })

    return tl
  }
}

// Hook for creating custom scroll animations with timeline
export const useScrollTimeline = (
  dependencies: any[] = [],
  options: ScrollAnimationOptions = {}
): [RefObject<HTMLElement | null>, gsap.core.Timeline | null] => {
  const elementRef = useRef<HTMLElement | null>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    let ScrollTrigger: any

    const initScrollTrigger = async () => {
      const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger')
      ScrollTrigger = ST
      gsap.registerPlugin(ScrollTrigger)

      if (!elementRef.current) return

      const element = elementRef.current
      const tl = gsap.timeline()

      ScrollTrigger.create({
        trigger: options.trigger || element,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub || false,
        pin: options.pin || false,
        snap: options.snap || false,
        markers: options.markers || false,
        animation: tl,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
      })

      timelineRef.current = tl

      return () => {
        tl.kill()
      }
    }

    const cleanup = initScrollTrigger()

    return () => {
      cleanup?.then(cleanupFn => cleanupFn?.())
    }
  }, dependencies)

  return [elementRef, timelineRef.current]
}

// Utility to batch ScrollTrigger updates
export const batchScrollTriggerUpdate = () => {
  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    ScrollTrigger.batch('.scroll-animate', {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }
        )
      },
      onLeave: (elements) => {
        gsap.to(elements, { opacity: 0, y: -50, duration: 0.5, stagger: 0.1 })
      },
      onEnterBack: (elements) => {
        gsap.to(elements, { opacity: 1, y: 0, duration: 1, stagger: 0.1 })
      }
    })
  })
}

// Hook for observing element visibility without ScrollTrigger
export const useIntersectionAnimation = <T extends HTMLElement = HTMLElement>(
  animationFunction: (element: Element) => void,
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<T>(null)

  useEffect(() => {
  const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animationFunction(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [animationFunction])

  return elementRef
}