'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface LoadingConfig {
  // Animation durations (in milliseconds)
  animationDuration: number
  exitDuration: number
  navigationDelay: number
  
  // Visual customization
  backgroundColor: string
  strokeColor: string
  textColor: string
  strokeWidth: number
  
  // Behavior settings
  disableOnSlowDevices: boolean
  respectReducedMotion: boolean
  showOnInitialLoad: boolean
  
  // Text customization
  loadingText: string
  language: string
}

export interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  loadingConfig: LoadingConfig
  updateConfig: (config: Partial<LoadingConfig>) => void
  isInitialLoad: boolean
}

const defaultConfig: LoadingConfig = {
  animationDuration: 3000,
  exitDuration: 1000,
  navigationDelay: 1000,
  backgroundColor: '#f7f7f7',
  strokeColor: '#171717',
  textColor: '#171717',
  strokeWidth: 12,
  disableOnSlowDevices: false,
  respectReducedMotion: true,
  showOnInitialLoad: true,
  loadingText: 'LOADING',
  language: 'en'
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
  config?: Partial<LoadingConfig>
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ 
  children, 
  config = {} 
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [loadingConfig, setLoadingConfig] = useState<LoadingConfig>({
    ...defaultConfig,
    ...config
  })

  // Handle initial page load
  useEffect(() => {
    const handleInitialLoad = () => {
      if (loadingConfig.showOnInitialLoad) {
        if (document.readyState !== 'complete') {
          setIsLoading(true)
        }
        
        const onLoad = () => {
          setTimeout(() => {
            setIsLoading(false)
            setIsInitialLoad(false)
          }, loadingConfig.navigationDelay)
        }

        if (document.readyState === 'complete') {
          onLoad()
        } else {
          window.addEventListener('load', onLoad, { once: true })
          return () => window.removeEventListener('load', onLoad)
        }
      } else {
        setIsInitialLoad(false)
      }
    }

    handleInitialLoad()
  }, [loadingConfig.showOnInitialLoad, loadingConfig.navigationDelay])

  // Check for reduced motion preference
  useEffect(() => {
    if (loadingConfig.respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          updateConfig({
            animationDuration: 1000,
            exitDuration: 300,
            navigationDelay: 200
          })
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      
      // Check initial state
      if (mediaQuery.matches) {
        updateConfig({
          animationDuration: 1000,
          exitDuration: 300,
          navigationDelay: 200
        })
      }

      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [loadingConfig.respectReducedMotion])

  // Check for slow devices
  useEffect(() => {
    if (loadingConfig.disableOnSlowDevices) {
      // Check if device has limited resources
      const isSlowDevice = (
        navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
      ) || (
        'deviceMemory' in navigator && 
        (navigator as any).deviceMemory <= 2
      )

      if (isSlowDevice) {
        updateConfig({
          animationDuration: 500,
          exitDuration: 200,
          navigationDelay: 100
        })
      }
    }
  }, [loadingConfig.disableOnSlowDevices])

  const updateConfig = (newConfig: Partial<LoadingConfig>) => {
    setLoadingConfig(prev => ({ ...prev, ...newConfig }))
  }

  const contextValue: LoadingContextType = {
    isLoading,
    setIsLoading,
    loadingConfig,
    updateConfig,
    isInitialLoad
  }

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  )
}