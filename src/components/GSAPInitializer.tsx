'use client'

import { useEffect } from 'react'
import { initGSAP, setupScrollAnimations } from '@/lib/gsap'

const GSAPInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize GSAP
    initGSAP()
    
    // Setup scroll animations (NOT ScrollSmoother - that's in ScrollSmootherWrapper)
    setupScrollAnimations()
    
    // Cleanup function
    return () => {
      // Any cleanup needed
    }
  }, [])

  return null
}

export default GSAPInitializer