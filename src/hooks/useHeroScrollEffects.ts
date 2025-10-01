'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroScrollEffectsConfig {
  enabled?: boolean
  startScale?: number
  endScale?: number
  startHeight?: string
  endHeight?: string
  duration?: number
  ease?: string
}

export const useHeroScrollEffects = (config: HeroScrollEffectsConfig = {}) => {
  const heroRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  
  const {
    enabled = true,
    startScale = 1.2,
    endScale = 1,
    startHeight = '100vh',
    endHeight = 'auto',
    duration = 1,
    ease = 'power2.out'
  } = config

  const initializeScrollEffects = useCallback(() => {
    if (!heroRef.current || !enabled) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const heroElement = heroRef.current
    const heroContent = heroElement.querySelector('.hero-content')
    const heroBackground = heroElement.querySelector('.hero-background')

    // Create timeline for hero scroll effects
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroElement,
        start: 'top top',
        end: 'bottom top+=20%',
        scrub: 1.2,
        pin: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // Add markers for debugging (remove in production)
        // markers: true,
        onUpdate: (self) => {
          // Optional: Add custom logic based on scroll progress
          const progress = self.progress
          
          // Add parallax effect to background elements
          if (heroBackground) {
            gsap.set(heroBackground, {
              y: progress * 100,
              opacity: 1 - progress * 0.5
            })
          }
        }
      }
    })

    // Hero container scaling and height animation
    tl.fromTo(heroElement, 
      {
        scale: startScale,
        height: startHeight,
        transformOrigin: 'center top'
      },
      {
        scale: endScale,
        height: endHeight,
        duration: duration,
        ease: ease
      }
    )

    // Hero content scaling (counter-scale to maintain readability)
    if (heroContent) {
      tl.fromTo(heroContent,
        {
          scale: 1 / startScale, // Counter the parent scale
          y: 0
        },
        {
          scale: 1,
          y: -50,
          duration: duration,
          ease: ease
        },
        0 // Start at the same time as hero scaling
      )
    }

    // Floating elements enhanced animation
    const floatingElements = heroElement.querySelectorAll('.floating-element')
    floatingElements.forEach((element, index) => {
      tl.to(element,
        {
          y: (index % 2 === 0 ? 1 : -1) * 200,
          rotation: (index % 2 === 0 ? 1 : -1) * 180,
          opacity: 0,
          duration: duration,
          ease: 'power1.out'
        },
        0
      )
    })

    // Store timeline reference for cleanup
    timelineRef.current = tl

    return tl
  }, [enabled, startScale, endScale, startHeight, endHeight, duration, ease])

  const refreshScrollTrigger = useCallback(() => {
    ScrollTrigger.refresh()
  }, [])

  const killScrollEffects = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill()
      timelineRef.current = null
    }
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === heroRef.current) {
        trigger.kill()
      }
    })
  }, [])

  useEffect(() => {
    if (!enabled) return

    // Initialize effects after component mount
    const timer = setTimeout(() => {
      initializeScrollEffects()
    }, 100)

    // Refresh on window resize
    const handleResize = () => {
      setTimeout(refreshScrollTrigger, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      killScrollEffects()
    }
  }, [enabled, initializeScrollEffects, refreshScrollTrigger, killScrollEffects])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      killScrollEffects()
    }
  }, [killScrollEffects])

  return {
    heroRef,
    refreshScrollTrigger,
    killScrollEffects,
    reinitialize: initializeScrollEffects
  }
}