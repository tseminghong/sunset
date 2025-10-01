'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'
import { useLoading } from '@/contexts/LoadingContext'

export interface NavigationOptions {
  delay?: number
  showLoading?: boolean
  onStart?: () => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export const usePageTransition = () => {
  const router = useRouter()
  const { setIsLoading, isLoading, loadingConfig } = useLoading()
  const isNavigatingRef = useRef(false)

  const navigateWithTransition = useCallback(
    async (
      href: string, 
      options: NavigationOptions = {}
    ) => {
      const {
        delay = loadingConfig.navigationDelay,
        showLoading = true,
        onStart,
        onComplete,
        onError
      } = options

      // Prevent multiple simultaneous navigations
      if (isNavigatingRef.current) {
        return
      }

      try {
        isNavigatingRef.current = true
        onStart?.()

        if (showLoading) {
          setIsLoading(true)
        }

        // Add delay to show loading animation
        await new Promise(resolve => setTimeout(resolve, delay))

        // Perform navigation
        router.push(href)

        // Wait for page transition to complete
        await new Promise(resolve => setTimeout(resolve, 100))

        onComplete?.()

      } catch (error) {
        console.error('Navigation error:', error)
        onError?.(error as Error)
      } finally {
        isNavigatingRef.current = false
        
        // Hide loading after exit animation duration
        if (showLoading) {
          setTimeout(() => {
            setIsLoading(false)
          }, loadingConfig.exitDuration)
        }
      }
    },
    [router, setIsLoading, loadingConfig, isLoading]
  )

  const preload = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  const replace = useCallback(
    async (href: string, options: NavigationOptions = {}) => {
      const {
        delay = loadingConfig.navigationDelay,
        showLoading = true,
        onStart,
        onComplete,
        onError
      } = options

      if (isNavigatingRef.current) {
        return
      }

      try {
        isNavigatingRef.current = true
        onStart?.()

        if (showLoading) {
          setIsLoading(true)
        }

        await new Promise(resolve => setTimeout(resolve, delay))
        router.replace(href)
        await new Promise(resolve => setTimeout(resolve, 100))

        onComplete?.()

      } catch (error) {
        console.error('Replace navigation error:', error)
        onError?.(error as Error)
      } finally {
        isNavigatingRef.current = false
        
        if (showLoading) {
          setTimeout(() => {
            setIsLoading(false)
          }, loadingConfig.exitDuration)
        }
      }
    },
    [router, setIsLoading, loadingConfig]
  )

  const back = useCallback(
    async (options: NavigationOptions = {}) => {
      const {
        delay = loadingConfig.navigationDelay,
        showLoading = true,
        onStart,
        onComplete,
        onError
      } = options

      if (isNavigatingRef.current) {
        return
      }

      try {
        isNavigatingRef.current = true
        onStart?.()

        if (showLoading) {
          setIsLoading(true)
        }

        await new Promise(resolve => setTimeout(resolve, delay))
        router.back()
        await new Promise(resolve => setTimeout(resolve, 100))

        onComplete?.()

      } catch (error) {
        console.error('Back navigation error:', error)
        onError?.(error as Error)
      } finally {
        isNavigatingRef.current = false
        
        if (showLoading) {
          setTimeout(() => {
            setIsLoading(false)
          }, loadingConfig.exitDuration)
        }
      }
    },
    [router, setIsLoading, loadingConfig]
  )

  return {
    navigate: navigateWithTransition,
    replace,
    back,
    preload,
    isNavigating: isNavigatingRef.current,
    isLoading
  }
}