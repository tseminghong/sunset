'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
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
              width="5rem"
              height="5rem"
              viewBox="0 0 100 100"
              className="loading-circle"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                strokeWidth="12"
                className="loading-circle-path"
              />
            </svg>
          </motion.div>

          {/* Loading Text */}
          <motion.div
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