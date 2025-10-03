'use client'

import { useState, useEffect, useCallback, useMemo, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Code, Play, RotateCcw } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

interface Lesson {
  title: string
  content: string
  starterCode?: string
}

const DEFAULT_CODE_PLACEHOLDER = '// Write some JavaScript here and click Run'
const LESSON_PROGRESS_STORAGE_KEY = 'learnjs_current_lesson_v1'

const LESSONS: Lesson[] = [
  {
    title: "1. Introduction to JavaScript",
    content: `JavaScript adds interactivity to web pages. It runs in every modern browser and on servers (Node.js). You can manipulate the DOM, make network requests, and build full applications.

**In this course** you'll move from the basics to practical patterns. Open the *Code Editor* to try code as you go.`
  },
  {
    title: "2. Variables & Data Types",
    content: `Declare variables with \`let\` (mutable), \`const\` (immutable reference), or legacy \`var\` (function-scoped). Primitive types include: string, number, boolean, null, undefined, bigint, symbol.

\`\`\`javascript
// Examples
const siteName = 'LearnJS';
let visits = 0;
visits += 1; // increment
console.log(typeof visits); // 'number'
\`\`\``,
    starterCode: `const siteName = 'LearnJS';
let visits = 0;
visits += 1;
console.log('Visits:', visits);`
  },
  {
    title: "3. Strings & Template Literals",
    content: `Template literals use backticks (\`) and allow expression interpolation with \`\${expression}\`.

\`\`\`javascript
const user = 'Ava';
console.log(\`Hello \${user}!\`);
\`\`\``,
    starterCode: `const user = 'Ava';
console.log(\`Hello \${user}!\`);`
  },
  {
    title: "4. Functions",
    content: `Functions encapsulate reusable logic. Arrow functions are concise; traditional functions have their own \`this\`.

\`\`\`javascript
// Arrow vs traditional
const add = (a, b) => a + b;
function multiply(a, b) { return a * b; }
console.log(add(2,3), multiply(2,3));
\`\`\``,
    starterCode: `const add = (a, b) => a + b;
function multiply(a, b) { return a * b; }
console.log('Add 2+3 =', add(2, 3));
console.log('Multiply 2*3 =', multiply(2, 3));`
  },
  {
    title: "5. Control Flow",
    content: `Use \`if\`, \`else\`, \`switch\`, loops (\`for\`, \`while\`, \`for...of\`) and early returns to shape logic.

\`\`\`javascript
for (let i = 1; i <= 3; i++) {
  if (i === 2) console.log('Middle');
  else console.log(i);
}
\`\`\``,
    starterCode: `for (let i = 1; i <= 5; i++) {
  if (i % 2 === 0) console.log(i, 'even');
  else console.log(i, 'odd');
}`
  },
  {
    title: "6. Arrays & Iteration",
    content: `Arrays store ordered lists. Helpful methods: \`map\`, \`filter\`, \`reduce\`, \`find\`.

\`\`\`javascript
const nums = [1, 2, 3, 4];
const doubled = nums.map(n => n * 2);
console.log(doubled);
\`\`\``,
    starterCode: `const nums = [1, 2, 3, 4];
console.log('Sum:', nums.reduce((a, b) => a + b, 0));`
  },
  {
    title: "7. Objects",
    content: `Objects hold key-value pairs. Use dot or bracket notation.

\`\`\`javascript
const user = { id: 7, name: 'Ava', active: true };
user.role = 'admin';
console.log(Object.keys(user));
\`\`\``,
    starterCode: `const user = { id: 1, name: 'Kai' };
user.country = 'SG';
console.log(user);`
  },
  {
    title: "8. DOM Basics",
    content: `The DOM (Document Object Model) represents HTML as nodes. Use \`querySelector\`, modify \`textContent\`, attributes, and classes.

\`\`\`javascript
// Try this in the editor (console tab):
document.body.style.background = '#202830';
\`\`\``
  },
  {
    title: "9. Events",
    content: `Respond to user actions with \`addEventListener\`.

\`\`\`javascript
document.addEventListener('click', () => console.log('Clicked page'));
\`\`\``,
    starterCode: `document.addEventListener('mousemove', e => {
  if (e.clientX % 100 === 0) console.log('X=', e.clientX);
});
console.log('Move your mouse.');`
  },
  {
    title: "10. Next Steps",
    content: `You completed the intro track. Continue with async JS (promises, fetch), modules, tooling, and frameworks.

Practice daily: small scripts, read docs, build mini projects.`
  }
]

const AuthModal = dynamic(() => import('@/components/AuthModal'), {
  ssr: false,
  loading: () => null
})

const CODE_BLOCK_REGEX = /```javascript\n([\s\S]*?)\n```/

function formatLessonContent(content: string): ReactNode[] {
  const segments = content.split(CODE_BLOCK_REGEX)
  const elements: ReactNode[] = []

  segments.forEach((segment, index) => {
    if (index % 2 === 1) {
      elements.push(
        <pre
          key={`code-${index}`}
          className="bg-tertiary border border-secondary rounded-lg p-4 my-4 overflow-x-auto"
        >
          <code className="text-sm text-primary font-mono">{segment}</code>
        </pre>
      )
      return
    }

    const paragraphs = segment.split('\n\n')
    paragraphs.forEach((paragraph, pIndex) => {
      const trimmed = paragraph.trim()
      if (!trimmed) return

      const withInlineCode = trimmed.replace(
        /`([^`]+)`/g,
        '<code class="bg-tertiary px-1 py-0.5 rounded text-sm">$1</code>'
      )
      const withBold = withInlineCode.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      const withItalic = withBold.replace(/\*([^*]+)\*/g, '<em>$1</em>')

      elements.push(
        <p
          key={`text-${index}-${pIndex}`}
          className="text-secondary mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: withItalic }}
        />
      )
    })
  })

  return elements
}

export default function JavaScriptPage() {
  const { t } = useLanguage()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeOutput, setCodeOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const lessons = LESSONS
  const lessonsLength = lessons.length
  const currentLesson = lessons[currentLessonIndex]
  const progressPercent = useMemo(
    () => ((currentLessonIndex + 1) / lessonsLength) * 100,
    [currentLessonIndex, lessonsLength]
  )
  const formattedLessonContent = useMemo(
    () => formatLessonContent(currentLesson.content),
    [currentLesson.content]
  )

  // Load lesson from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LESSON_PROGRESS_STORAGE_KEY)
      if (saved) {
        const index = parseInt(saved, 10)
        if (!isNaN(index) && index >= 0 && index < lessons.length) {
          setCurrentLessonIndex(index)
        }
      }
    } catch (e) {
      console.error('Error loading lesson:', e)
    }
  }, [])

  // Save lesson to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(LESSON_PROGRESS_STORAGE_KEY, currentLessonIndex.toString())
    } catch (e) {
      console.error('Error saving lesson:', e)
    }
  }, [currentLessonIndex])

  // Apply starter code when lesson changes or editor opens
  useEffect(() => {
    if (!isEditorOpen) return

    const starterCode = currentLesson?.starterCode
    setCodeInput(prev => {
      if (starterCode && prev.trim() === '') {
        return starterCode
      }

      if (!starterCode && prev.trim() === '') {
        return DEFAULT_CODE_PLACEHOLDER
      }

      return prev
    })
  }, [currentLesson?.starterCode, currentLessonIndex, isEditorOpen])

  // Keyboard navigation
  const handleLessonKeyboardShortcuts = useCallback((e: KeyboardEvent) => {
    const activeElement = document.activeElement
    if (activeElement?.tagName === 'TEXTAREA' || activeElement?.tagName === 'INPUT') {
      return
    }

    if (e.key === 'ArrowLeft') {
      setCurrentLessonIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'ArrowRight') {
      setCurrentLessonIndex(prev => Math.min(prev + 1, lessonsLength - 1))
    }
  }, [lessonsLength])

  useEffect(() => {
    document.addEventListener('keydown', handleLessonKeyboardShortcuts)
    return () => document.removeEventListener('keydown', handleLessonKeyboardShortcuts)
  }, [handleLessonKeyboardShortcuts])

  const goToPrevLesson = useCallback(() => {
    setCurrentLessonIndex(prev => Math.max(prev - 1, 0))
  }, [])

  const goToNextLesson = useCallback(() => {
    setCurrentLessonIndex(prev => Math.min(prev + 1, lessonsLength - 1))
  }, [lessonsLength])

  const toggleEditor = useCallback(() => {
    setIsEditorOpen(prev => {
      const next = !prev
      if (!prev) {
        setCodeOutput('')
      }
      return next
    })
  }, [])

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setCodeOutput('Running...')

    // Simulate console.log capture
    const consoleLines: string[] = []
    const originalLog = console.log

    try {
      // Override console.log to capture output
      console.log = (...args: unknown[]) => {
        consoleLines.push(args.map(arg => String(arg)).join(' '))
        originalLog(...args)
      }

      // Create a simple evaluation function
      // Note: In production, you'd want a more secure sandboxed execution
      const evalFunction = new Function('console', codeInput)
      const result = evalFunction({ log: (...args: unknown[]) => consoleLines.push(args.map(arg => String(arg)).join(' ')) })
      
      if (result !== undefined) {
        consoleLines.push('Return: ' + String(result))
      }
      
      setCodeOutput(consoleLines.join('\n') || '(no output)')
    } catch (error) {
      setCodeOutput('Error: ' + (error as Error).message)
    } finally {
      console.log = originalLog
      setIsRunning(false)
    }
  }, [codeInput])

  const resetCode = () => {
    const lesson = lessons[currentLessonIndex]
    setCodeInput(lesson.starterCode || DEFAULT_CODE_PLACEHOLDER)
    setCodeOutput('')
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">{t('courses.javascript.title')}</h1>
          <p className="text-secondary">
            Use <kbd className="bg-tertiary px-2 py-1 rounded text-xs font-mono">←</kbd>/
            <kbd className="bg-tertiary px-2 py-1 rounded text-xs font-mono">→</kbd> to navigate
          </p>
        </motion.div>

        {/* Main Lesson Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-secondary border border-secondary rounded-2xl p-8 mb-8"
        >
          {/* Lesson Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">{currentLesson.title}</h2>
            <div className="lesson-content">
              {formattedLessonContent}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={goToPrevLesson}
                disabled={currentLessonIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-tertiary text-secondary border border-secondary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('common.prev')}
              </button>
              
              <div className="text-sm font-semibold text-primary">
                {t('courses.javascript.lesson')} {currentLessonIndex + 1} {t('common.of')} {lessons.length}
              </div>
              
              <button
                onClick={goToNextLesson}
                disabled={currentLessonIndex === lessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 primary-btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('common.next')}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={toggleEditor}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Code className="h-4 w-4" />
              {t('courses.javascript.codeEditor')}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-secondary">{t('courses.javascript.progress')}</span>
              <span className="text-sm text-secondary">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-tertiary rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <div className="text-sm text-secondary">
            Viewing: {currentLesson.title}
          </div>
        </motion.div>

        {/* Code Editor */}
        {isEditorOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="bg-secondary border border-secondary rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary">Interactive Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="primary-btn px-4 py-2 flex items-center gap-2 disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  {t('common.run')}
                </button>
                <button
                  onClick={resetCode}
                  className="px-4 py-2 bg-tertiary text-secondary border border-secondary rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t('common.reset')}
                </button>
              </div>
            </div>
            
            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              className="w-full h-40 p-4 bg-tertiary border border-secondary rounded-lg text-primary font-mono text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('courses.javascript.codePlaceholder')}
              spellCheck={false}
            />
            
            <div className="mt-4 relative">
              <div className="absolute -top-3 left-3 bg-secondary px-2 text-xs text-secondary font-semibold">
                Console
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-16 font-mono text-sm whitespace-pre-wrap border">
                {codeOutput || t('courses.javascript.noOutput')}
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}