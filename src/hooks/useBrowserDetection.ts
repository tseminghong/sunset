'use client'

import { useState, useEffect } from 'react'

interface BrowserInfo {
  isSafari: boolean
  isChrome: boolean
  isFirefox: boolean
  isEdge: boolean
  isIOS: boolean
  isMobile: boolean
  browserName: string
}

/**
 * Hook to detect the user's browser
 * Useful for conditionally rendering features based on browser support
 * 
 * Note: liquid-glass-react has LIMITED support in Safari/Firefox
 * (displacement effect won't be visible)
 */
export function useBrowserDetection(): BrowserInfo {
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    isSafari: false,
    isChrome: false,
    isFirefox: false,
    isEdge: false,
    isIOS: false,
    isMobile: false,
    browserName: 'unknown'
  })

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return
    }

    const userAgent = navigator.userAgent.toLowerCase()
    const vendor = navigator.vendor?.toLowerCase() || ''

    // Detect iOS first (iPhone, iPad, iPod) - these use Safari engine
    const isIOS = /iphone|ipad|ipod/.test(userAgent)

    // Detect Safari - includes iOS Safari and macOS Safari
    // Safari UA contains "safari" but not "chrome" or "chromium"
    // iOS Safari: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1
    // macOS Safari: Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15
    const isSafari = 
      (userAgent.includes('safari') && 
       !userAgent.includes('chrome') && 
       !userAgent.includes('chromium') &&
       !userAgent.includes('edg')) ||
      isIOS // iOS always uses Safari engine

    // Detect Chrome (but not Edge which is Chromium-based)
    const isChrome = 
      (userAgent.includes('chrome') || userAgent.includes('chromium')) && 
      !userAgent.includes('edg') &&
      !isIOS // Chrome on iOS is actually Safari

    // Detect Firefox
    const isFirefox = userAgent.includes('firefox')

    // Detect Edge (Chromium-based)
    const isEdge = userAgent.includes('edg')

    // Detect mobile devices
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)

    // Determine browser name
    let browserName = 'unknown'
    if (isSafari || isIOS) browserName = 'safari'
    else if (isEdge) browserName = 'edge'
    else if (isChrome) browserName = 'chrome'
    else if (isFirefox) browserName = 'firefox'

    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Browser Detection]', {
        userAgent: navigator.userAgent,
        vendor,
        isSafari,
        isChrome,
        isFirefox,
        isEdge,
        isIOS,
        isMobile,
        browserName
      })
    }

    setBrowserInfo({
      isSafari,
      isChrome,
      isFirefox,
      isEdge,
      isIOS,
      isMobile,
      browserName
    })
  }, [])

  return browserInfo
}

/**
 * Check if the browser fully supports liquid glass effects
 * Chrome/Chromium browsers have full support
 * Safari/Firefox have limited support (no displacement)
 */
export function useLiquidGlassSupport(): {
  hasFullSupport: boolean
  hasPartialSupport: boolean
  isSupported: boolean
} {
  const { isChrome, isEdge, isSafari, isFirefox } = useBrowserDetection()

  // Chrome and Edge (Chromium-based) have full support
  const hasFullSupport = isChrome || isEdge

  // Safari and Firefox have partial support (no displacement)
  const hasPartialSupport = isSafari || isFirefox

  // Overall support check
  const isSupported = hasFullSupport || hasPartialSupport

  return {
    hasFullSupport,
    hasPartialSupport,
    isSupported
  }
}

export default useBrowserDetection
