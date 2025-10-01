'use client'

import React from 'react'
import LoadingOverlay from './LoadingOverlay'
import { useLoading } from '@/contexts/LoadingContext'

const LoadingManager: React.FC = () => {
  const { isLoading, loadingConfig } = useLoading()

  return (
    <LoadingOverlay
      isVisible={isLoading}
      loadingText={loadingConfig.loadingText}
      className={`
        loading-overlay
        transition-all duration-1000 ease-out
      `}
      style={{
        backgroundColor: loadingConfig.backgroundColor,
        '--loading-stroke': loadingConfig.strokeColor,
        '--loading-text': loadingConfig.textColor,
        '--loading-stroke-width': loadingConfig.strokeWidth,
        '--loading-animation-duration': `${loadingConfig.animationDuration}ms`
      } as React.CSSProperties}
    />
  )
}

export default LoadingManager