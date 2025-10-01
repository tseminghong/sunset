'use client'

import React, { useEffect, useRef, useState } from 'react'
import { setupScrollSmoother } from '@/lib/gsap'

interface ScrollSmootherWrapperProps {
  children: React.ReactNode
  enabled?: boolean
  smoothness?: number
  smoothTouch?: number | boolean
  effects?: boolean
  className?: string
}

const ScrollSmootherWrapper: React.FC<ScrollSmootherWrapperProps> = ({
  children,
  enabled = true,
  smoothness = 1.5,
  smoothTouch = 0.1,
  effects = true,
  className = ''
}) => {
  const [isReady, setIsReady] = useState(false)
  const smootherRef = useRef<any>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) {
      setIsReady(true)
      return
    }

    const initScrollSmoother = async () => {
      try {
        // Check if device supports smooth scrolling
        const supportsScrollSmoother = () => {
          // Disable on older browsers or low-end devices
          const isOldBrowser = !window.CSS?.supports?.('scroll-behavior', 'smooth')
          const isLowEndDevice = 'deviceMemory' in navigator && (navigator as any).deviceMemory < 4
          const isTouchDevice = 'ontouchstart' in window
          
          // Disable on touch devices with low memory
          if (isTouchDevice && isLowEndDevice) return false
          if (isOldBrowser) return false
          
          return true
        }

        if (!supportsScrollSmoother()) {
          console.info('ScrollSmoother disabled for this device/browser')
          setIsReady(true)
          return
        }

        const [{ ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
          import('gsap/ScrollTrigger'),
          import('gsap/ScrollSmoother')
        ])

        const { gsap } = await import('@/lib/gsap')
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

        // Wait for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          try {
            smootherRef.current = ScrollSmoother.create({
              wrapper: wrapperRef.current!,
              content: contentRef.current!,
              smooth: smoothness,
              effects: effects,
              smoothTouch: smoothTouch,
              normalizeScroll: true,
              ignoreMobileResize: true,
              onUpdate: (self) => {
                // Update CSS custom property for scroll progress
                document.documentElement.style.setProperty(
                  '--scroll-progress', 
                  self.progress.toString()
                )
                
                // Update scroll velocity for effects
                document.documentElement.style.setProperty(
                  '--scroll-velocity', 
                  Math.abs(self.getVelocity()).toString()
                )
              }
            })

            // Refresh on load and font ready
            const handleLoad = () => {
              smootherRef.current?.refresh()
              ScrollTrigger.refresh()
            }

            window.addEventListener('load', handleLoad)
            document.fonts.ready.then(handleLoad)

            // Handle resize
            const handleResize = () => {
              smootherRef.current?.refresh()
              ScrollTrigger.refresh()
            }

            window.addEventListener('resize', handleResize)

            setIsReady(true)

            return () => {
              window.removeEventListener('load', handleLoad)
              window.removeEventListener('resize', handleResize)
              smootherRef.current?.kill()
            }
          } catch (error) {
            console.warn('Failed to initialize ScrollSmoother:', error)
            setIsReady(true)
          }
        })
      } catch (error) {
        console.warn('ScrollSmoother not available:', error)
        setIsReady(true)
      }
    }

    initScrollSmoother()
  }, [enabled, smoothness, smoothTouch, effects])

  // Utility methods for controlling ScrollSmoother
  const scrollTo = (target: string | number | Element, smooth = true) => {
    if (smootherRef.current) {
      smootherRef.current.scrollTo(target, smooth)
    } else {
      // Fallback for native scrolling
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
      } else if (typeof target === 'string') {
        const element = document.querySelector(target)
        element?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      } else if (target instanceof Element) {
        target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
      }
    }
  }

  const refresh = () => {
    smootherRef.current?.refresh()
  }

  // Create a ref for exposing methods to parent components
  const scrollSmootherRef = useRef({
    scrollTo,
    refresh,
    get smoother() {
      return smootherRef.current
    }
  })

  // Update ref methods when dependencies change
  useEffect(() => {
    scrollSmootherRef.current = {
      scrollTo,
      refresh,
      get smoother() {
        return smootherRef.current
      }
    }
  }, [])

  if (!enabled) {
    return <div className={className}>{children}</div>
  }

  return (
    <div 
      ref={wrapperRef}
      id="smooth-wrapper"
      className={`fixed top-0 left-0 w-full h-full overflow-hidden ${className}`}
      style={{ 
        opacity: isReady ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <div 
        ref={contentRef}
        id="smooth-content"
        className="relative"
        style={{ 
          width: '100%',
          minHeight: '100%'
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Hook for accessing ScrollSmoother instance
export const useScrollSmoother = () => {
  const [smoother, setSmoother] = useState<any>(null)

  useEffect(() => {
    const checkSmoother = () => {
      try {
        import('gsap/ScrollSmoother').then(({ ScrollSmoother }) => {
          const instance = ScrollSmoother.get()
          setSmoother(instance)
        })
      } catch (error) {
        console.warn('ScrollSmoother not available')
      }
    }

    checkSmoother()
    
    // Check periodically until ScrollSmoother is available
    const interval = setInterval(() => {
      if (!smoother) {
        checkSmoother()
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [smoother])

  return {
    smoother,
    scrollTo: (target: string | number | Element, smooth = true) => {
      if (smoother) {
        smoother.scrollTo(target, smooth)
      } else {
        // Fallback
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
        } else if (typeof target === 'string') {
          document.querySelector(target)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
        } else if (target instanceof Element) {
          target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
        }
      }
    },
    refresh: () => smoother?.refresh(),
    isReady: !!smoother
  }
}

export default ScrollSmootherWrapper