'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default function ThreeDScrollBackground() {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const gridRef = useRef<SVGGElement>(null)
  const connectionsRef = useRef<SVGGElement>(null)
  const nodesRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!rootRef.current || !svgRef.current || !gridRef.current || !connectionsRef.current || !nodesRef.current) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true
    })

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    const svgNs = 'http://www.w3.org/2000/svg'
    const gridGroup = gridRef.current
    const connectionsGroup = connectionsRef.current
    const nodesGroup = nodesRef.current
    const cx = 500
    const cy = 500
    const nodes: Array<{ x: number; y: number; ring: number }> = []

    for (let i = -200; i <= 1200; i += 60) {
      const horizontalPath = document.createElementNS(svgNs, 'path')
      horizontalPath.setAttribute('d', `M -200 ${i} L 1200 ${i}`)
      horizontalPath.setAttribute('stroke', 'rgba(16, 185, 129, 0.07)')
      horizontalPath.setAttribute('stroke-width', '1')
      horizontalPath.classList.add('draw-path', 'grid-line')
      gridGroup.appendChild(horizontalPath)

      const verticalPath = document.createElementNS(svgNs, 'path')
      verticalPath.setAttribute('d', `M ${i} -200 L ${i} 1200`)
      verticalPath.setAttribute('stroke', 'rgba(16, 185, 129, 0.07)')
      verticalPath.setAttribute('stroke-width', '1')
      verticalPath.classList.add('draw-path', 'grid-line')
      gridGroup.appendChild(verticalPath)
    }

    const rings = [
      { radius: 220, count: 8 },
      { radius: 350, count: 16 },
      { radius: 480, count: 24 }
    ]

    rings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count; i += 1) {
        const angle = (i * Math.PI * 2) / ring.count + Math.random() * 0.2
        const radius = ring.radius + (Math.random() * 40 - 20)
        const nodeX = cx + radius * Math.cos(angle)
        const nodeY = cy + radius * Math.sin(angle)

        nodes.push({ x: nodeX, y: nodeY, ring: ringIndex })

        const dot = document.createElementNS(svgNs, 'circle')
        dot.setAttribute('cx', `${nodeX}`)
        dot.setAttribute('cy', `${nodeY}`)
        dot.setAttribute('r', ringIndex === 0 ? '5' : '3')
        dot.setAttribute('fill', ringIndex % 2 === 0 ? '#00f2fe' : '#10b981')
        dot.classList.add('node-dot')
        if (Math.random() > 0.5) {
          dot.setAttribute('filter', 'url(#glow-cyan)')
        }
        nodesGroup.appendChild(dot)
      }
    })

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const sourceNode = nodes[i]
        const targetNode = nodes[j]
        const distance = Math.hypot(sourceNode.x - targetNode.x, sourceNode.y - targetNode.y)

        if (distance > 50 && distance < 160) {
          const line = document.createElementNS(svgNs, 'path')
          line.setAttribute('d', `M ${sourceNode.x} ${sourceNode.y} L ${targetNode.x} ${targetNode.y}`)
          line.setAttribute('stroke', 'rgba(0, 242, 254, 0.18)')
          line.setAttribute('stroke-width', '1')
          line.classList.add('draw-path', 'network-line')
          connectionsGroup.appendChild(line)
        }
      }
    }

    const allPaths = svgRef.current.querySelectorAll<SVGPathElement>('.draw-path')
    const gridLines = svgRef.current.querySelectorAll<SVGPathElement>('.grid-line')
    const networkLines = svgRef.current.querySelectorAll<SVGPathElement>('.network-line')
    const nodeDots = svgRef.current.querySelectorAll<SVGCircleElement>('.node-dot')
    allPaths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    })

    gsap.set(nodeDots, { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
    gsap.set(svgRef.current, { rotationX: 45, rotationZ: -10, transformOrigin: '50% 50%' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: true
      }
    })

    tl.to(svgRef.current, {
      rotationX: 75,
      rotationZ: 25,
      scale: 3.2,
      duration: 12,
      ease: 'power1.inOut'
    }, 0)

    tl.to(gridLines, {
      strokeDashoffset: 0,
      duration: 4,
      ease: 'power1.out'
    }, 0)

    tl.to(networkLines, {
      strokeDashoffset: 0,
      duration: 6,
      stagger: { amount: 3, from: 'center' },
      ease: 'power2.out'
    }, 1)

    tl.to(nodeDots, {
      scale: 1,
      opacity: 1,
      duration: 3,
      stagger: { amount: 2, from: 'center' },
      ease: 'back.out(2)'
    }, 2)

    tl.to('#orbit-1', { rotation: 360, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, 0)
    tl.to('#orbit-2', { rotation: -360, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, 0)
    tl.to('#core-diamond', { rotation: 180, transformOrigin: '50% 50%', duration: 12, ease: 'none' }, 0)
    tl.to('#code-bg', { y: -200, opacity: 0, duration: 5 }, 0)

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      tl.kill()
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  }, [])

  return (
    <div ref={rootRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div id="code-bg" className="absolute left-[5%] top-[10%] z-[5] whitespace-pre font-mono text-xs text-[rgba(16,185,129,0.4)]">
        {`> INITIALIZING NETWORK...\n> SYSTEM BOOT SEQUENCE [OK]\n> HPCCSS_ICT_CORE.EXE\n> ESTABLISHING CONNECTIONS...`}
      </div>
      <div className="absolute inset-0 z-[1] flex items-center justify-center" style={{ perspective: '1200px' }}>
        <svg
          ref={svgRef}
          id="main-svg"
          viewBox="0 0 1000 1000"
          className="h-[150vmin] w-[150vmin]"
          style={{ overflow: 'visible', willChange: 'transform' }}
        >
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g ref={gridRef} id="grid-group" />
          <g ref={connectionsRef} id="connections-group" />
          <g ref={nodesRef} id="nodes-group" />
          <g id="core-group" transform="translate(500, 500)">
            <circle
              cx="0"
              cy="0"
              r="100"
              fill="none"
              stroke="rgba(0, 242, 254, 0.3)"
              strokeWidth="1"
              strokeDasharray="4 8"
              id="orbit-1"
            />
            <circle
              cx="0"
              cy="0"
              r="150"
              fill="none"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="2"
              strokeDasharray="20 10 5 10"
              id="orbit-2"
            />
            <polygon
              points="0,-40 35,0 0,40 -35,0"
              fill="none"
              stroke="#00f2fe"
              strokeWidth="3"
              filter="url(#glow-cyan)"
              id="core-diamond"
            />
            <circle cx="0" cy="0" r="15" fill="#10b981" filter="url(#glow-green)" id="core-dot" />
          </g>
        </svg>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,7,18,0.08)_0%,rgba(3,7,18,0.38)_55%,rgba(3,7,18,0.62)_100%)]" />
    </div>
  )
}
