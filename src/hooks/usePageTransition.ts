'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useRef } from 'react'

export interface NavigationOptions {
  delay?: number
  onStart?: () => void
  onComplete?: () => void
  onError?: (error: Error) => void
}

export const usePageTransition = () => {
  const router = useRouter()
  const isNavigatingRef = useRef(false)

  const navigateWithTransition = useCallback(
    async (
      href: string, 
      options: NavigationOptions = {}
    ) => {
      const {
        delay = 500,
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

        // Add delay for smooth transition
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
      }
    },
    [router]
  )

  const preload = useCallback((href: string) => {
    router.prefetch(href)
  }, [router])

  const replace = useCallback(
    async (href: string, options: NavigationOptions = {}) => {
      const {
        delay = 500,
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

        await new Promise(resolve => setTimeout(resolve, delay))
        router.replace(href)
        await new Promise(resolve => setTimeout(resolve, 100))

        onComplete?.()

      } catch (error) {
        console.error('Replace navigation error:', error)
        onError?.(error as Error)
      } finally {
        isNavigatingRef.current = false
      }
    },
    [router]
  )

  const back = useCallback(
    async (options: NavigationOptions = {}) => {
      const {
        delay = 500,
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

        await new Promise(resolve => setTimeout(resolve, delay))
        router.back()
        await new Promise(resolve => setTimeout(resolve, 100))

        onComplete?.()

      } catch (error) {
        console.error('Back navigation error:', error)
        onError?.(error as Error)
      } finally {
        isNavigatingRef.current = false
      }
    },
    [router]
  )

  return {
    navigate: navigateWithTransition,
    replace,
    back,
    preload,
    isNavigating: isNavigatingRef.current
  }
}