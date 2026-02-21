'use client'

import { useEffect, useState } from 'react'

export default function FullscreenSVGAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  
    useEffect(() => {
      setIsMounted(true)

      const style = document.createElement('style')
      style.textContent = `
        .fullscreen-svg-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #0b1120;
          z-index: 999999;
          pointer-events: none;
        }

        .svg-container {
          width: 100%;
          max-width: 600px;
          padding: 20px;
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.3));
        }

        .svg-container svg {
          width: 100%;
          height: auto;
          display: block;
        }

        .text-element {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: 2px;
          fill: #38bdf8;
          text-anchor: middle;
          dominant-baseline: middle;
        }

        .anim-layer {
          opacity: 0;
          transform-origin: 200px 150px;
          animation: translateSequence 12s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .state-1 { animation-delay: 0s; }
        .state-2 { animation-delay: 3s; }
        .state-3 { animation-delay: 6s; }
        .state-4 { animation-delay: 9s; }

        @keyframes translateSequence {
          0% { opacity: 0; transform: scale(0.85) translateY(15px); }
          4% { opacity: 1; transform: scale(1) translateY(0); }
          21% { opacity: 1; transform: scale(1) translateY(0); }
          25% { opacity: 0; transform: scale(1.1) translateY(-15px); }
          100% { opacity: 0; transform: scale(1.1) translateY(-15px); }
        }
      `

      document.head.appendChild(style)

      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 12000)

      return () => {
        clearTimeout(timer)
        document.head.removeChild(style)
      }
    }, [])

    if (!isMounted || !isVisible) {
      return null
    }

    return (
      <div className="fullscreen-svg-container">
        <div className="svg-container">
          <svg viewBox="0 0 400 300">
            <g className="anim-layer state-1">
              <text x="200" y="150" className="text-element">Hpccss ICT</text>
            </g>

            <g className="anim-layer state-2">
              <g transform="translate(140, 100)">
                <rect x="10" y="20" width="100" height="65" rx="4" fill="none" stroke="#38bdf8" strokeWidth="6" />
                <rect x="16" y="26" width="88" height="53" rx="2" fill="#38bdf8" opacity="0.15" />
                <path d="M -5 90 L 125 90 L 115 100 L 5 100 Z" fill="#38bdf8" />
                <rect x="45" y="93" width="30" height="4" rx="2" fill="#0b1120" />
                <rect x="45" y="85" width="30" height="5" fill="#38bdf8" />
              </g>
            </g>

            <g className="anim-layer state-3">
              <g transform="translate(140, 100)">
                <rect x="25" y="80" width="30" height="12" fill="#38bdf8" />
                <rect x="65" y="80" width="15" height="12" fill="#38bdf8" />
                <rect x="25" y="80" width="30" height="12" fill="none" stroke="#0b1120" strokeWidth="2" />

                <rect x="15" y="15" width="20" height="5" fill="#38bdf8" />

                <rect x="10" y="20" width="100" height="60" rx="4" fill="#0b1120" stroke="#38bdf8" strokeWidth="6" />

                <path d="M 60 20 V 80" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />

                <circle cx="35" cy="50" r="18" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="35" cy="50" r="13" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="10 6" />
                <circle cx="35" cy="50" r="4" fill="#38bdf8" />

                <circle cx="85" cy="50" r="18" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="85" cy="50" r="13" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="10 6" />
                <circle cx="85" cy="50" r="4" fill="#38bdf8" />
              </g>
            </g>

            <g className="anim-layer state-4">
              <text x="200" y="150" className="text-element">HP ICT</text>
            </g>
          </svg>
        </div>
      </div>
    )
}
