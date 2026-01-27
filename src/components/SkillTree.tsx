'use client'

import { useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

interface SkillNode {
  id: string
  label: string
  level: number
  x: number
  y: number
  completed?: boolean
}

interface SkillTreeProps {
  nodes?: SkillNode[]
  animated?: boolean
}

export default function SkillTree({ 
  nodes = [
    { id: 'hardware', label: 'Hardware', level: 1, x: 25, y: 20, completed: true },
    { id: 'os', label: 'Operating Systems', level: 2, x: 50, y: 40, completed: true },
    { id: 'networking', label: 'Networking', level: 2, x: 75, y: 40, completed: false },
    { id: 'internet', label: 'Internet Services', level: 3, x: 50, y: 60, completed: false },
    { id: 'cybersecurity', label: 'Cybersecurity', level: 3, x: 75, y: 60, completed: false },
    { id: 'databases', label: 'Databases', level: 3, x: 25, y: 60, completed: false },
  ],
  animated = true
}: SkillTreeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !animated) return

    const svg = svgRef.current

    // Animate paths
    const paths = Array.from(svg.querySelectorAll('path'))
    paths.forEach((path) => {
      const length = (path as any).getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svg,
          start: 'top center',
          end: 'center center',
          scrub: true,
          markers: false
        }
      })
    })

    // Animate nodes
    const nodes = Array.from(svg.querySelectorAll('.skill-node'))
    nodes.forEach((node, idx) => {
      const circle = node.querySelector('circle')
      if (circle) {
        gsap.fromTo(circle,
          { r: 0, opacity: 0 },
          {
            r: 20,
            opacity: 1,
            duration: 0.5,
            delay: idx * 0.1,
            ease: 'elastic.out(1, 0.75)'
          }
        )
      }
    })
  }, [animated])

  return (
    <div ref={containerRef} className="w-full py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        DSE ICT Learning Path
      </h2>
      
      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          className="w-full min-h-[400px] bg-gradient-to-b from-transparent via-blue-500/5 to-transparent rounded-lg border border-white/10"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Connection lines */}
          {/* Hardware to OS */}
          <path
            d="M 25 35 Q 37.5 37.5 50 45"
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hardware to Databases */}
          <path
            d="M 25 35 Q 25 47.5 25 60"
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* OS to Internet */}
          <path
            d="M 50 55 Q 50 57.5 50 60"
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Networking to Internet */}
          <path
            d="M 75 55 Q 62.5 57.5 50 60"
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Networking to Cybersecurity */}
          <path
            d="M 75 55 Q 75 57.5 75 60"
            stroke="rgba(100, 200, 255, 0.3)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Skill Nodes */}
          {nodes.map((node) => (
            <g key={node.id} className="skill-node cursor-pointer group">
              {/* Glow effect for completed nodes */}
              {node.completed && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill="rgba(100, 200, 255, 0.1)"
                  className="group-hover:r-26 transition-all"
                />
              )}
              
              {/* Main node */}
              <circle
                cx={node.x}
                cy={node.y}
                r="18"
                fill={node.completed ? 'rgba(100, 200, 255, 0.8)' : 'rgba(150, 150, 150, 0.3)'}
                stroke={node.completed ? '#64c8ff' : 'rgba(150, 150, 150, 0.5)'}
                strokeWidth="2"
                className="transition-all group-hover:r-20"
              />
              
              {/* Checkmark for completed */}
              {node.completed && (
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold fill-white select-none"
                  fontSize="12"
                >
                  ✓
                </text>
              )}
              
              {/* Label */}
              <text
                x={node.x}
                y={node.y + 28}
                textAnchor="middle"
                className="text-xs font-semibold fill-secondary select-none"
                fontSize="10"
              >
                {node.label}
              </text>
              
              {/* Level indicator */}
              <text
                x={node.x}
                y={node.y - 24}
                textAnchor="middle"
                className="text-xs fill-gray-400 select-none"
                fontSize="8"
              >
                Level {node.level}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-400"></div>
          <span className="text-secondary">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-gray-400"></div>
          <span className="text-secondary">In Progress</span>
        </div>
      </div>
    </div>
  )
}
