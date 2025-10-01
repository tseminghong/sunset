'use client'

import { useEffect } from 'react'
import { initGSAP, setupScrollAnimations, setupScrollSmoother } from '@/lib/gsap'

const GSAPInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize GSAP
    initGSAP()
    
    // Setup scroll animations
    setupScrollAnimations()
    
    // Setup ScrollSmoother (will check for compatibility)
    setupScrollSmoother().catch(error => {
      console.info('ScrollSmoother initialization skipped:', error.message)
    })
    
    // Cleanup function
    return () => {
      // Any cleanup needed
    }
  }, [])

  return null
}

export default GSAPInitializer