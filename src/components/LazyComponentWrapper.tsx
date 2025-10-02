'use client'

import React, { Suspense, lazy } from 'react'
import dynamic from 'next/dynamic'

// Lazy load heavy components
export const LazyPythonPage = lazy(() => import('@/app/python/page'))
export const LazyJavaScriptPage = lazy(() => import('@/app/javascript/page'))
export const LazyProcessingModesPage = lazy(() => import('@/app/processing-modes/page'))

// Dynamic component wrapper with loading fallback
interface LazyComponentWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ 
  children, 
  fallback = <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-lg">Loading...</div>
  </div>
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Enhanced dynamic import with proper loading states
export const createLazyComponent = <T extends Record<string, any>>(
  componentImport: () => Promise<{ default: React.ComponentType<T> }>,
  fallbackElement?: React.ReactNode
) => {
  return dynamic(componentImport, {
    loading: () => fallbackElement || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    ),
    ssr: false
  })
}

export default LazyComponentWrapper