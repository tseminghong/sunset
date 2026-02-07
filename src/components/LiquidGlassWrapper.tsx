'use client'

import React, { useRef, ReactNode, CSSProperties } from 'react'
import dynamic from 'next/dynamic'
import { useBrowserDetection } from '@/hooks/useBrowserDetection'

// Dynamically import LiquidGlass to avoid SSR issues
const LiquidGlass = dynamic(() => import('liquid-glass-react'), {
  ssr: false,
  loading: () => <div className="liquid-glass-fallback" />
})

interface LiquidGlassWrapperProps {
  children: ReactNode
  /** Only show liquid glass on Safari browser */
  safariOnly?: boolean
  /** Only show liquid glass on Chrome/Chromium browsers (full support) */
  chromeOnly?: boolean
  /** Show liquid glass on all supported browsers */
  allBrowsers?: boolean
  /** Fallback component when liquid glass is not shown */
  fallback?: ReactNode
  /** Liquid Glass props */
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  elasticity?: number
  cornerRadius?: number
  className?: string
  padding?: string
  style?: CSSProperties
  overLight?: boolean
  onClick?: () => void
  mode?: 'standard' | 'polar' | 'prominent' | 'shader'
  mouseContainer?: React.RefObject<HTMLElement | null>
}

/**
 * A wrapper component for liquid-glass-react that allows
 * conditional rendering based on browser type.
 * 
 * ⚠️ NOTE: Safari and Firefox only PARTIALLY support liquid glass effects
 * (displacement will not be visible). Chrome/Chromium has full support.
 * 
 * @example
 * // Only show liquid glass on Safari
 * <LiquidGlassWrapper safariOnly>
 *   <div>Your content</div>
 * </LiquidGlassWrapper>
 * 
 * @example
 * // Only show on Chrome (full support)
 * <LiquidGlassWrapper chromeOnly>
 *   <div>Your content</div>
 * </LiquidGlassWrapper>
 * 
 * @example
 * // Show on all browsers with custom fallback
 * <LiquidGlassWrapper 
 *   allBrowsers 
 *   fallback={<div className="glass-fallback">Content</div>}
 * >
 *   <div>Your content</div>
 * </LiquidGlassWrapper>
 */
export function LiquidGlassWrapper({
  children,
  safariOnly = false,
  chromeOnly = false,
  allBrowsers = false,
  fallback,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 999,
  className = '',
  padding,
  style,
  overLight = false,
  onClick,
  mode = 'standard',
  mouseContainer
}: LiquidGlassWrapperProps) {
  const { isSafari, isChrome, isEdge, isIOS } = useBrowserDetection()

  // Determine if we should show liquid glass based on browser conditions
  const shouldShowLiquidGlass = (() => {
    // If allBrowsers is true, always show (on supported browsers)
    if (allBrowsers) return true

    // Safari only mode - includes iOS Safari
    if (safariOnly) return isSafari || isIOS

    // Chrome only mode - includes Edge (Chromium-based)
    if (chromeOnly) return isChrome || isEdge

    // Default: show on all browsers
    return true
  })()

  // If we shouldn't show liquid glass, render fallback or just children
  if (!shouldShowLiquidGlass) {
    if (fallback) {
      return <>{fallback}</>
    }
    return (
      <div className={`liquid-glass-fallback ${className}`} style={style}>
        {children}
      </div>
    )
  }

  // Render the liquid glass component
  return (
    <LiquidGlass
      displacementScale={displacementScale}
      blurAmount={blurAmount}
      saturation={saturation}
      aberrationIntensity={aberrationIntensity}
      elasticity={elasticity}
      cornerRadius={cornerRadius}
      className={className}
      padding={padding}
      style={style}
      overLight={overLight}
      onClick={onClick}
      mode={mode}
      mouseContainer={mouseContainer}
    >
      {children}
    </LiquidGlass>
  )
}

export default LiquidGlassWrapper
