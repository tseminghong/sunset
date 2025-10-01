'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap, animations } from '@/lib/gsap'

interface LoadingOverlayProps {
  isVisible: boolean
  loadingText?: string
  className?: string
  style?: React.CSSProperties
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  loadingText = "LOADING",
  className = "",
  style = {}
}) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<SVGSVGElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (!isVisible || !circleRef.current || !pathRef.current) return

    // GSAP Circle Animation
    const tl = gsap.timeline({ repeat: -1 })
    
    // Rotate the entire circle
    tl.to(circleRef.current, {
      rotation: 360,
      duration: 2,
      ease: "none"
    }, 0)

    // Animate stroke dash
    tl.fromTo(pathRef.current, {
      strokeDashoffset: 251.2
    }, {
      strokeDashoffset: 62.8,
      duration: 1.5,
      ease: "power2.inOut"
    }, 0)
    .to(pathRef.current, {
      strokeDashoffset: 251.2,
      duration: 1.5,
      ease: "power2.inOut"
    }, 1.5)

    // Text pulse animation
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0.7,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      })
    }

    return () => {
      tl.kill()
    }
  }, [isVisible])

  const handleExit = () => {
    if (!overlayRef.current) return

    // GSAP exit animation
    const tl = gsap.timeline()
    
    // Fade out text first
    if (textRef.current) {
      tl.to(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.in"
      })
    }

    // Scale down and fade circle
    if (circleRef.current) {
      tl.to(circleRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      }, "-=0.2")
    }

    // Slide down overlay
    tl.to(overlayRef.current, {
      y: "100%",
      duration: 1,
      ease: "power2.inOut"
    }, "-=0.3")

    return tl
  }
  return (
    <AnimatePresence mode="wait" onExitComplete={() => {}}>
      {isVisible && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "100%",
            transition: { 
              duration: 1,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
          className={`
            loading-overlay
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            ${className}
          `}
          style={style}
          role="status"
          aria-label="Page loading"
          aria-live="polite"
        >
          {/* Animated SVG Circle */}
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              transition: { 
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
            className="loading-circle-container"
          >
            <svg
              ref={circleRef}
              width="5rem"
              height="5rem"
              viewBox="0 0 100 100"
              className="loading-circle"
              aria-hidden="true"
            >
              <circle
                ref={pathRef}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="12"
                className="loading-circle-path"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
              />
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: 20,
              transition: { 
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.1
              }
            }}
            className="loading-text"
          >
            {loadingText}
          </motion.div>

          {/* Screen Reader Only Progress Indicator */}
          <div className="sr-only" aria-live="assertive">
            Loading content, please wait...
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingOverlay