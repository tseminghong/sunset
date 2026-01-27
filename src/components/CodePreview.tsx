'use client'

import { useRef, useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface CodePreviewProps {
  language: 'html' | 'sql'
  title: string
  code: string
  preview?: string
  description?: string
}

export default function CodePreview({
  language,
  title,
  code,
  preview,
  description
}: CodePreviewProps) {
  const codeBlockRef = useRef<HTMLDivElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (codeBlockRef.current) {
      const lines = codeBlockRef.current.querySelectorAll('.code-line')
      lines.forEach((line, idx) => {
        (line as HTMLElement).style.animationDelay = `${idx * 0.05}s`
      })
    }
  }, [])

  const codeLines = code.split('\n').slice(0, 5) // Show first 5 lines by default

  return (
    <div className="glassmorphism-card rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-primary">{title}</h3>
          <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
            {language.toUpperCase()}
          </span>
        </div>
        {description && (
          <p className="text-xs text-secondary">{description}</p>
        )}
      </div>

      {/* Code Preview */}
      <div
        ref={codeBlockRef}
        className="relative overflow-hidden bg-black/20"
      >
        <pre className="p-4 text-xs overflow-x-auto">
          <code className="text-green-300 font-mono">
            {codeLines.map((line, idx) => (
              <div
                key={idx}
                className="code-line opacity-0 animate-fade-in-up"
              >
                <span className="text-gray-500 mr-4">{idx + 1}.</span>
                {line || ' '}
              </div>
            ))}
            {code.split('\n').length > 5 && (
              <div className="code-line opacity-50 text-gray-400 mt-2">
                ... ({code.split('\n').length - 5} more lines)
              </div>
            )}
          </code>
        </pre>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Live Preview (if available) */}
      {preview && language === 'html' && (
        <div className="p-4 bg-white dark:bg-white/5 border-t border-white/10">
          <p className="text-xs text-secondary mb-2">Live Preview:</p>
          <div
            className="text-xs p-2 bg-white dark:bg-black/30 rounded border border-white/10 text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: preview }}
          />
        </div>
      )}

      {/* Footer CTA */}
      <div className="p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-t border-white/10 flex justify-between items-center">
        <span className="text-xs text-secondary">
          Click to expand and edit
        </span>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors text-xs"
        >
          <span>Open Editor</span>
          <ChevronRight size={14} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Full Code View (Expandable) */}
      {isExpanded && (
        <div className="p-4 bg-black/40 border-t border-white/10">
          <pre className="text-xs overflow-x-auto">
            <code className="text-green-300 font-mono">
              {code.split('\n').map((line, idx) => (
                <div key={idx}>
                  <span className="text-gray-500 mr-4">{idx + 1}.</span>
                  {line || ' '}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </div>
  )
}
