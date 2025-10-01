'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, animations, createTimeline } from '@/lib/gsap'
import { useLoading } from '@/contexts/LoadingContext'

export interface GSAPNavigationOptions {
  delay?: number
  showLoading?: boolean
  onStart?: () => void
  onComplete?: () => void
  onError?: (error: Error) => void
  animationType?: 'fade' | 'slide' | 'scale' | 'custom'
}

export const useGSAPPageTransition = () => {
  const router = useRouter()
  const { setIsLoading, loadingConfig } = useLoading()
  const isNavigatingRef = useRef(false)
  const pageRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    pageRef.current = document.querySelector('main') || document.body
  }, [])

  const animatePageOut = (animationType: string = 'fade') => {
    if (!pageRef.current) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const tl = createTimeline({
        onComplete: resolve
      })

      switch (animationType) {
        case 'slide':
          tl.to(pageRef.current, {
            x: -100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut"
          })
          break
        case 'scale':
          tl.to(pageRef.current, {
            scale: 0.95,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut"
          })
          break
        case 'custom':
          tl.to(pageRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          })
          break
        default: // fade
          tl.to(pageRef.current, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut"
          })
      }
    })
  }

  const animatePageIn = (animationType: string = 'fade') => {
    if (!pageRef.current) return Promise.resolve()

    return new Promise<void>((resolve) => {
      const tl = createTimeline({
        onComplete: resolve
      })

      switch (animationType) {
        case 'slide':
          tl.fromTo(pageRef.current, 
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out"
            }
          )
          break
        case 'scale':
          tl.fromTo(pageRef.current,
            { scale: 1.05, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: "back.out(1.7)"
            }
          )
          break
        case 'custom':
          tl.fromTo(pageRef.current,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            }
          )
          break
        default: // fade
          tl.fromTo(pageRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            }
          )
      }
    })
  }

  const navigateWithGSAP = async (
    href: string,
    options: GSAPNavigationOptions = {}
  ) => {
    const {
      delay = loadingConfig.navigationDelay,
      showLoading = true,
      onStart,
      onComplete,
      onError,
      animationType = 'fade'
    } = options

    if (isNavigatingRef.current) return

    try {
      isNavigatingRef.current = true
      onStart?.()

      // Start page out animation
      await animatePageOut(animationType)

      if (showLoading) {
        setIsLoading(true)
      }

      // Add delay to show loading animation
      await new Promise(resolve => setTimeout(resolve, delay))

      // Perform navigation
      router.push(href)

      // Wait a bit for navigation to complete
      await new Promise(resolve => setTimeout(resolve, 100))

      // Animate page in after navigation
      setTimeout(() => {
        animatePageIn(animationType)
      }, 50)

      onComplete?.()

    } catch (error) {
      console.error('GSAP Navigation error:', error)
      onError?.(error as Error)
    } finally {
      isNavigatingRef.current = false
      
      if (showLoading) {
        setTimeout(() => {
          setIsLoading(false)
        }, loadingConfig.exitDuration)
      }
    }
  }

  const replaceWithGSAP = async (
    href: string,
    options: GSAPNavigationOptions = {}
  ) => {
    const {
      delay = loadingConfig.navigationDelay,
      showLoading = true,
      onStart,
      onComplete,
      onError,
      animationType = 'fade'
    } = options

    if (isNavigatingRef.current) return

    try {
      isNavigatingRef.current = true
      onStart?.()

      await animatePageOut(animationType)

      if (showLoading) {
        setIsLoading(true)
      }

      await new Promise(resolve => setTimeout(resolve, delay))
      router.replace(href)
      await new Promise(resolve => setTimeout(resolve, 100))

      setTimeout(() => {
        animatePageIn(animationType)
      }, 50)

      onComplete?.()

    } catch (error) {
      console.error('GSAP Replace navigation error:', error)
      onError?.(error as Error)
    } finally {
      isNavigatingRef.current = false
      
      if (showLoading) {
        setTimeout(() => {
          setIsLoading(false)
        }, loadingConfig.exitDuration)
      }
    }
  }

  const backWithGSAP = async (
    options: GSAPNavigationOptions = {}
  ) => {
    const {
      delay = loadingConfig.navigationDelay,
      showLoading = true,
      onStart,
      onComplete,
      onError,
      animationType = 'slide'
    } = options

    if (isNavigatingRef.current) return

    try {
      isNavigatingRef.current = true
      onStart?.()

      await animatePageOut(animationType)

      if (showLoading) {
        setIsLoading(true)
      }

      await new Promise(resolve => setTimeout(resolve, delay))
      router.back()
      await new Promise(resolve => setTimeout(resolve, 100))

      setTimeout(() => {
        animatePageIn(animationType)
      }, 50)

      onComplete?.()

    } catch (error) {
      console.error('GSAP Back navigation error:', error)
      onError?.(error as Error)
    } finally {
      isNavigatingRef.current = false
      
      if (showLoading) {
        setTimeout(() => {
          setIsLoading(false)
        }, loadingConfig.exitDuration)
      }
    }
  }

  const preload = (href: string) => {
    router.prefetch(href)
  }

  return {
    navigate: navigateWithGSAP,
    replace: replaceWithGSAP,
    back: backWithGSAP,
    preload,
    isNavigating: isNavigatingRef.current,
    animatePageIn,
    animatePageOut
  }
}