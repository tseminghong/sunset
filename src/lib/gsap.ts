import { gsap } from 'gsap'

// GSAP Configuration
export const initGSAP = () => {
  // Register plugins if needed (ScrollTrigger, etc. will be registered when used)
  
  // Set default ease
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6
  })

  // Disable GSAP warnings in production
  if (process.env.NODE_ENV === 'production') {
    gsap.config({
      nullTargetWarn: false
    })
  }

  // Performance optimizations
  optimizeForDevice()
}

// Animation Utilities
export const animations = {
  // Fade animations
  fadeIn: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(target, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: "power2.out",
        ...options 
      }
    )
  },

  fadeOut: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      opacity: 0,
      y: -30,
      duration: 0.6,
      ease: "power2.in",
      ...options
    })
  },

  // Scale animations
  scaleIn: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(target,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        ...options
      }
    )
  },

  scaleOut: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      ...options
    })
  },

  // Slide animations
  slideInFromLeft: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(target,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        ...options
      }
    )
  },

  slideInFromRight: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(target,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        ...options
      }
    )
  },

  slideInFromBottom: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(target,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        ...options
      }
    )
  },

  slideOutToBottom: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      y: "100%",
      duration: 1,
      ease: "power2.inOut",
      ...options
    })
  },

  // Stagger animations for multiple elements
  staggerIn: (targets: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.fromTo(targets,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        ...options
      }
    )
  },

  // Loading spinner
  spin: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      rotation: 360,
      duration: 2,
      ease: "none",
      repeat: -1,
      ...options
    })
  },

  // Pulse animation
  pulse: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      scale: 1.05,
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      ...options
    })
  },

  // Button press effect
  buttonPress: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    const tl = gsap.timeline()
    tl.to(target, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      ...options
    })
    .to(target, {
      scale: 1,
      duration: 0.2,
      ease: "back.out(1.7)"
    })
    return tl
  },

  // Glass morphism hover effect
  glassHover: (target: gsap.TweenTarget, options?: gsap.TweenVars) => {
    return gsap.to(target, {
      backdropFilter: "blur(20px)",
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
      ...options
    })
  }
}

// Timeline utilities
export const createTimeline = (options?: gsap.TimelineVars) => {
  return gsap.timeline(options)
}

// Scroll-triggered animations setup
export const setupScrollAnimations = () => {
  // This will be called when ScrollTrigger is needed
  import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
    gsap.registerPlugin(ScrollTrigger)
    
    // Refresh ScrollTrigger after fonts load
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh()
    })
  })
}

// ScrollSmoother setup
export const setupScrollSmoother = async () => {
  try {
    const [{ ScrollTrigger }, { ScrollSmoother }] = await Promise.all([
      import('gsap/ScrollTrigger'),
      import('gsap/ScrollSmoother')
    ])
    
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
    
    // Create ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1, // Enable smooth scrolling on mobile (with reduced intensity)
      normalizeScroll: true,
      ignoreMobileResize: true,
      onUpdate: (self) => {
        // Update scroll progress for any dependent animations
        document.documentElement.style.setProperty('--scroll-progress', self.progress.toString())
      }
    })
    
    // Refresh after fonts and images load
    window.addEventListener('load', () => {
      smoother.refresh()
    })
    
    document.fonts.ready.then(() => {
      smoother.refresh()
    })
    
    return smoother
  } catch (error) {
    console.warn('ScrollSmoother not available, falling back to native scroll:', error)
    return null
  }
}

// Cleanup utility
export const killAllAnimations = () => {
  gsap.killTweensOf("*")
  gsap.globalTimeline.clear()
}

// Responsive animations
export const getResponsiveDuration = (baseDuration: number) => {
  const isMobile = window.innerWidth < 768
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) return baseDuration * 0.3
  if (isMobile) return baseDuration * 0.8
  return baseDuration
}

// Performance optimization
export const optimizeForDevice = () => {
  const isLowEnd = (
    navigator.hardwareConcurrency <= 2 ||
    ('deviceMemory' in navigator && (navigator as any).deviceMemory <= 2)
  )

  if (isLowEnd) {
    gsap.config({
      force3D: false,
      autoSleep: 60
    })
  }
}

export { gsap }