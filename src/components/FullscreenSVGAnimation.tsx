'use client'

import { useEffect, useRef, useState } from 'react'

export default function FullscreenSVGAnimation() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const centeredGroupRef = useRef<SVGGElement>(null)
  const contentGroupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    setIsMounted(true)
    
    // We'll play the animation on every hard refresh for now so you can see it.
    // If you want it strictly once per browser session, we can re-enable sessionStorage.
    
    // Add animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes fadeOutAnimation {
        0% { opacity: 1; visibility: visible; }
        85% { opacity: 1; visibility: visible; }
        100% { opacity: 0; visibility: hidden; }
      }

      .fullscreen-svg-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #0b0f19 0%, #1a1f2e 50%, #0b0f19 100%);
        z-index: 999999;
        animation: fadeOutAnimation 7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        pointer-events: none;
      }

      .fullscreen-svg-wrapper {
        width: min(92vw, 720px);
        height: min(34vh, 260px);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .fullscreen-svg {
        width: 100%;
        height: auto;
        display: block;
        overflow: visible;
        filter: drop-shadow(0 0 40px rgba(0, 229, 255, 0.3));
      }

      .hp-ict-text {
        font-size: 90px;
        font-weight: 800;
        font-family: 'Montserrat', system-ui, sans-serif;
      }

      .h-lower {
        animation: hp-fadeLower 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform-origin: 100px 105px;
      }
      
      .h-upper {
        animation: hp-fadeUpper 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform-origin: 100px 105px;
        opacity: 0;
      }
      
      .p-lower {
        animation: hp-fadeLower 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform-origin: 155px 105px;
      }

      .p-upper {
        animation: hp-fadeUpper 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform-origin: 155px 105px;
        opacity: 0;
      }

      .ccss-text {
        animation: hp-ccssVanish 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transform-origin: 185px 105px;
      }

      .ict-text {
        animation: hp-slideICT 6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes hp-ccssVanish {
        0%, 10% { opacity: 1; transform: scaleX(1); }
        20%, 85% { opacity: 0; transform: scaleX(0); }
        95%, 100% { opacity: 1; transform: scaleX(1); }
      }

      @keyframes hp-slideICT {
        0%, 20% { transform: translateX(0); }
        30%, 80% { transform: translateX(-190px); }
        90%, 100% { transform: translateX(0); }
      }

      @keyframes hp-fadeLower {
        0%, 30% { opacity: 1; transform: scale(1); filter: blur(0px); }
        40%, 75% { opacity: 0; transform: scale(0.5); filter: blur(6px); }
        85%, 100% { opacity: 1; transform: scale(1); filter: blur(0px); }
      }

      @keyframes hp-fadeUpper {
        0%, 30% { opacity: 0; transform: scale(0.5); filter: blur(6px); }
        40%, 75% { opacity: 1; transform: scale(1); filter: blur(0px); }
        85%, 100% { opacity: 0; transform: scale(0.5); filter: blur(6px); }
      }

      @media (max-width: 768px) {
        .hp-ict-text {
          font-size: 60px;
        }
      }

      @media (max-width: 480px) {
        .hp-ict-text {
          font-size: 45px;
        }
      }
    `
    document.head.appendChild(style)

    // Hide animation after it completes
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 7000)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    if (!isMounted || !isVisible) {
      return
    }

    const recenterContent = () => {
      if (!centeredGroupRef.current || !contentGroupRef.current) {
        return
      }

      const bbox = contentGroupRef.current.getBBox()
      const targetCenterX = 300
      const targetCenterY = 100
      const contentCenterX = bbox.x + bbox.width / 2
      const contentCenterY = bbox.y + bbox.height / 2
      const offsetX = targetCenterX - contentCenterX
      const offsetY = targetCenterY - contentCenterY

      centeredGroupRef.current.setAttribute('transform', `translate(${offsetX} ${offsetY})`)
    }

    const rafId = requestAnimationFrame(recenterContent)
    const timeoutId = window.setTimeout(recenterContent, 120)
    window.addEventListener('resize', recenterContent)

    if (document.fonts?.ready) {
      document.fonts.ready.then(recenterContent).catch(() => undefined)
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      window.removeEventListener('resize', recenterContent)
    }
  }, [isMounted, isVisible])

  if (!isMounted) return null

  if (!isVisible) return null

  return (
    <div className="fullscreen-svg-container">
      <div className="fullscreen-svg-wrapper">
        <svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet" className="fullscreen-svg">
          <defs>
            {/* Electric blue gradient for HP elements */}
            <linearGradient id="blueGradFullscreen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#0077FF" />
            </linearGradient>
            
            {/* Crisp silver/white gradient for ICT */}
            <linearGradient id="whiteGradFullscreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#B0BEC5" />
            </linearGradient>
          </defs>

          <g ref={centeredGroupRef}>
            <g ref={contentGroupRef}>
              {/* H / h */}
              <text x="100" y="130" textAnchor="middle" className="h-lower hp-ict-text" fill="url(#blueGradFullscreen)">h</text>
              <text x="100" y="130" textAnchor="middle" className="h-upper hp-ict-text" fill="url(#blueGradFullscreen)">H</text>

              {/* P / p */}
              <text x="155" y="130" textAnchor="middle" className="p-lower hp-ict-text" fill="url(#blueGradFullscreen)">p</text>
              <text x="155" y="130" textAnchor="middle" className="p-upper hp-ict-text" fill="url(#blueGradFullscreen)">P</text>

              {/* ccss */}
              <text x="185" y="130" textAnchor="start" className="ccss-text hp-ict-text" fill="url(#blueGradFullscreen)">ccss</text>

              {/* ICT */}
              <text x="395" y="130" textAnchor="start" className="ict-text hp-ict-text" fill="url(#whiteGradFullscreen)">ICT</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
