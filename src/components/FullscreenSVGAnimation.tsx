'use client'

import { useEffect, useState, type CSSProperties } from 'react'

type VarStyle = CSSProperties & Record<string, string>

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
        overflow: hidden;
      }

      .svg-container {
        width: 100%;
        max-width: 700px;
        padding: 20px;
        filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.25));
      }

      .svg-container svg {
        width: 100%;
        height: auto;
        overflow: visible;
        display: block;
      }

      .text-element {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 800;
        fill: #38bdf8;
      }

      .t1-letter {
        font-size: 38px;
        transform-box: fill-box;
        transform-origin: center;
        animation: text1-anim 16s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes text1-anim {
        0%, 3% { opacity: 0; transform: translateY(20px) scale(0.5); }
        6%, 18% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        22%, 100% { opacity: 0; transform: translate(var(--outx), var(--outy)) scale(0) rotate(var(--outr)); }
      }

      .lap-part {
        transform-box: fill-box;
        transform-origin: center;
        animation: laptop-anim 16s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes laptop-anim {
        0%, 18% { opacity: 0; transform: translate(var(--inx), var(--iny)) scale(0) rotate(var(--inr)); }
        22%, 40% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
        44%, 100% { opacity: 0; transform: translate(var(--outx), var(--outy)) scale(0) rotate(var(--outr)); }
      }

      .gpu-part {
        transform-box: fill-box;
        transform-origin: center;
        animation: gpu-anim 16s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes gpu-anim {
        0%, 40% { opacity: 0; transform: translate(var(--inx), var(--iny)) scale(0) rotate(var(--inr)); }
        44%, 75% { opacity: 1; transform: translate(0, 0) scale(1) rotate(0deg); }
        79%, 100% { opacity: 0; transform: translate(var(--outx), var(--outy)) scale(0) rotate(var(--outr)); }
      }

      .spin-fast {
        animation: spin-anim 1s linear infinite;
      }

      @keyframes spin-anim {
        to { transform: rotate(360deg); }
      }

      .render-beam {
        opacity: 0;
        transform-box: fill-box;
        transform-origin: bottom;
        animation: beam-anim 16s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes beam-anim {
        0%, 64% { opacity: 0; transform: scaleY(0); }
        65% { opacity: 1; transform: scaleY(0); }
        68%, 70% { opacity: 1; transform: scaleY(1); }
        73% { opacity: 0; transform: scaleY(1) translateY(-30px); }
        100% { opacity: 0; }
      }

      .text2-anim {
        font-size: 58px;
        letter-spacing: 4px;
        fill: transparent;
        stroke: #38bdf8;
        stroke-width: 1.5;
        stroke-dasharray: 400;
        stroke-dashoffset: 400;
        animation: text2-draw 16s 1 cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      @keyframes text2-draw {
        0%, 65% { opacity: 0; stroke-dashoffset: 400; fill: transparent; }
        66% { opacity: 1; stroke-dashoffset: 400; fill: transparent; }
        70% { stroke-dashoffset: 0; fill: transparent; }
        73%, 93% { stroke-dashoffset: 0; fill: #38bdf8; opacity: 1; }
        98%, 100% { opacity: 0; stroke-dashoffset: 0; fill: #38bdf8; }
      }
    `

    document.head.appendChild(style)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 16000)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
    }
  }, [])

  if (!isMounted || !isVisible) return null

  return (
    <div className="fullscreen-svg-container">
      <div className="svg-container">
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="beamGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g className="text-element">
            <text x="95" y="150" className="t1-letter" style={{ '--outx': '-100px', '--outy': '-80px', '--outr': '-75deg' } as VarStyle}>H</text>
            <text x="125" y="150" className="t1-letter" style={{ '--outx': '-70px', '--outy': '-100px', '--outr': '-45deg' } as VarStyle}>p</text>
            <text x="145" y="150" className="t1-letter" style={{ '--outx': '-40px', '--outy': '-120px', '--outr': '-25deg' } as VarStyle}>c</text>
            <text x="165" y="150" className="t1-letter" style={{ '--outx': '-10px', '--outy': '-130px', '--outr': '-10deg' } as VarStyle}>c</text>
            <text x="185" y="150" className="t1-letter" style={{ '--outx': '20px', '--outy': '-120px', '--outr': '15deg' } as VarStyle}>s</text>
            <text x="205" y="150" className="t1-letter" style={{ '--outx': '50px', '--outy': '-100px', '--outr': '35deg' } as VarStyle}>s</text>
            <text x="240" y="150" className="t1-letter" style={{ '--outx': '80px', '--outy': '-60px', '--outr': '60deg' } as VarStyle}>I</text>
            <text x="260" y="150" className="t1-letter" style={{ '--outx': '100px', '--outy': '-20px', '--outr': '85deg' } as VarStyle}>C</text>
            <text x="285" y="150" className="t1-letter" style={{ '--outx': '120px', '--outy': '20px', '--outr': '110deg' } as VarStyle}>T</text>
          </g>

          <g transform="translate(140, 100)">
            <rect className="lap-part" style={{ '--inx': '-80px', '--iny': '-100px', '--inr': '-60deg', '--outx': '-120px', '--outy': '60px', '--outr': '-90deg' } as VarStyle} x="10" y="20" width="100" height="65" rx="4" fill="none" stroke="#38bdf8" strokeWidth="6" />
            <rect className="lap-part" style={{ '--inx': '80px', '--iny': '-100px', '--inr': '60deg', '--outx': '120px', '--outy': '60px', '--outr': '90deg' } as VarStyle} x="16" y="26" width="88" height="53" rx="2" fill="#38bdf8" opacity="0.15" />
            <path className="lap-part" style={{ '--inx': '0px', '--iny': '100px', '--inr': '90deg', '--outx': '0px', '--outy': '120px', '--outr': '180deg' } as VarStyle} d="M -5 90 L 125 90 L 115 100 L 5 100 Z" fill="#38bdf8" />
            <rect className="lap-part" style={{ '--inx': '-60px', '--iny': '50px', '--inr': '-45deg', '--outx': '-80px', '--outy': '140px', '--outr': '-120deg' } as VarStyle} x="45" y="93" width="30" height="4" rx="2" fill="#0b1120" />
            <rect className="lap-part" style={{ '--inx': '60px', '--iny': '50px', '--inr': '45deg', '--outx': '80px', '--outy': '140px', '--outr': '120deg' } as VarStyle} x="45" y="85" width="30" height="5" fill="#38bdf8" />
          </g>

          <g transform="translate(140, 150)">
            <rect className="render-beam" x="10" y="-80" width="100" height="100" fill="url(#beamGrad)" />

            <rect className="gpu-part" style={{ '--inx': '-100px', '--iny': '60px', '--inr': '-90deg', '--outx': '-100px', '--outy': '100px', '--outr': '-45deg' } as VarStyle} x="25" y="80" width="30" height="12" fill="#38bdf8" />
            <rect className="gpu-part" style={{ '--inx': '-50px', '--iny': '80px', '--inr': '-90deg', '--outx': '-50px', '--outy': '120px', '--outr': '-45deg' } as VarStyle} x="65" y="80" width="15" height="12" fill="#38bdf8" />
            <rect className="gpu-part" style={{ '--inx': '100px', '--iny': '60px', '--inr': '90deg', '--outx': '100px', '--outy': '100px', '--outr': '45deg' } as VarStyle} x="15" y="15" width="20" height="5" fill="#38bdf8" />

            <rect className="gpu-part" style={{ '--inx': '0px', '--iny': '100px', '--inr': '180deg', '--outx': '0px', '--outy': '150px', '--outr': '90deg' } as VarStyle} x="10" y="20" width="100" height="60" rx="4" fill="#0b1120" stroke="#38bdf8" strokeWidth="6" />
            <path className="gpu-part" style={{ '--inx': '120px', '--iny': '0px', '--inr': '180deg', '--outx': '150px', '--outy': '50px', '--outr': '180deg' } as VarStyle} d="M 60 20 V 80" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />

            <g className="gpu-part" style={{ '--inx': '-80px', '--iny': '-50px', '--inr': '-180deg', '--outx': '-120px', '--outy': '-50px', '--outr': '-180deg' } as VarStyle}>
              <g className="spin-fast" style={{ transformOrigin: '35px 50px' }}>
                <circle cx="35" cy="50" r="18" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="35" cy="50" r="13" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="10 6" />
                <circle cx="35" cy="50" r="4" fill="#38bdf8" />
              </g>
            </g>

            <g className="gpu-part" style={{ '--inx': '80px', '--iny': '-50px', '--inr': '180deg', '--outx': '120px', '--outy': '-50px', '--outr': '180deg' } as VarStyle}>
              <g className="spin-fast" style={{ transformOrigin: '85px 50px' }}>
                <circle cx="85" cy="50" r="18" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <circle cx="85" cy="50" r="13" fill="none" stroke="#38bdf8" strokeWidth="6" strokeDasharray="10 6" />
                <circle cx="85" cy="50" r="4" fill="#38bdf8" />
              </g>
            </g>
          </g>

          <text x="200" y="100" textAnchor="middle" className="text-element text2-anim">HP ICT</text>
        </svg>
      </div>
    </div>
  )
}
