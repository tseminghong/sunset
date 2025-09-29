'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, BookOpen, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'
import AuthModal from '@/components/AuthModal'
import Footer from '@/components/Footer'
import { useLanguage } from '@/contexts/LanguageContext'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  topic: string
}

export default function DSEPage() {
  const { t } = useLanguage()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentTopic, setCurrentTopic] = useState('all')

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const selectAnswer = (questionId: number, answerIndex: number) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: answerIndex
      }))
    }
  }

  const submitQuiz = () => {
    setShowResults(true)
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setShowResults(false)
  }

  const questions: Question[] = [
    {
      id: 1,
      question: "Which of the following is NOT a type of system software?",
      options: [
        "Operating System",
        "Device Drivers",
        "Web Browser",
        "Programming Tools"
      ],
      correctAnswer: 2,
      explanation: "A web browser is application software, not system software. System software includes OS, device drivers, and programming tools.",
      topic: "software"
    },
    {
      id: 2,
      question: "What is the primary function of the CPU&apos;s Control Unit?",
      options: [
        "Perform arithmetic calculations",
        "Store data temporarily",
        "Manage instruction execution",
        "Handle input/output operations"
      ],
      correctAnswer: 2,
      explanation: "The Control Unit manages the execution of instructions and coordinates other CPU components.",
      topic: "hardware"
    },
    {
      id: 3,
      question: "In which processing mode are jobs collected and processed as a group?",
      options: [
        "Online Processing",
        "Real-time Processing",
        "Batch Processing",
        "Interactive Processing"
      ],
      correctAnswer: 2,
      explanation: "Batch processing collects multiple jobs and processes them together as a group, typically during off-peak hours.",
      topic: "processing"
    },
    {
      id: 4,
      question: "Which SQL command is used to retrieve data from a database table?",
      options: [
        "INSERT",
        "SELECT",
        "UPDATE",
        "DELETE"
      ],
      correctAnswer: 1,
      explanation: "SELECT is the SQL command used to query and retrieve data from database tables.",
      topic: "database"
    },
    {
      id: 5,
      question: "What type of memory is volatile and loses data when power is turned off?",
      options: [
        "Hard Disk Drive",
        "Solid State Drive",
        "RAM (Random Access Memory)",
        "ROM (Read Only Memory)"
      ],
      correctAnswer: 2,
      explanation: "RAM is volatile memory that loses its contents when power is removed, unlike non-volatile storage like HDDs and SSDs.",
      topic: "hardware"
    },
    {
      id: 6,
      question: "Which software development methodology emphasizes iterative development with short cycles?",
      options: [
        "Waterfall Model",
        "Agile Methodology",
        "Spiral Model",
        "V-Model"
      ],
      correctAnswer: 1,
      explanation: "Agile methodology uses iterative development with short development cycles called sprints and emphasizes continuous feedback.",
      topic: "software"
    },
    {
      id: 7,
      question: "What is the main advantage of distributed processing?",
      options: [
        "Lower cost",
        "Simpler programming",
        "Better fault tolerance",
        "Faster single-core performance"
      ],
      correctAnswer: 2,
      explanation: "Distributed processing provides better fault tolerance as the system can continue operating even if some components fail.",
      topic: "processing"
    },
    {
      id: 8,
      question: "Which JOIN operation returns only records that have matching values in both tables?",
      options: [
        "LEFT JOIN",
        "RIGHT JOIN",
        "INNER JOIN",
        "FULL OUTER JOIN"
      ],
      correctAnswer: 2,
      explanation: "INNER JOIN returns only the records that have matching values in both tables being joined.",
      topic: "database"
    }
  ]

  const topics = [
    { id: 'all', name: 'All Topics', color: 'gray' },
    { id: 'software', name: 'Software', color: 'blue' },
    { id: 'hardware', name: 'Hardware', color: 'green' },
    { id: 'processing', name: 'Processing', color: 'purple' },
    { id: 'database', name: 'Database', color: 'red' }
  ]

  const filteredQuestions = currentTopic === 'all' 
    ? questions 
    : questions.filter(q => q.topic === currentTopic)

  const getScore = () => {
    const correctAnswers = filteredQuestions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length
    return { correct: correctAnswers, total: filteredQuestions.length }
  }

  const dseSections = [
    {
      id: 'about',
      title: t('dse.overview'),
      content: (
        <div className="space-y-4">
          <p className="text-secondary">
            The Hong Kong Diploma of Secondary Education (DSE) ICT examination tests students&apos; understanding of 
            Information and Communication Technology concepts and applications.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Exam Structure</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                <li>• <strong>Paper 1:</strong> Compulsory section (2.5 hours)</li>
                <li>• <strong>Paper 2:</strong> Elective section (2.5 hours)</li>
                <li>• <strong>SBA:</strong> School-based Assessment (20%)</li>
                <li>• Multiple choice and long questions</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Key Topics</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>• Information Processing</li>
                <li>• Computer Systems</li>
                <li>• Internet and its Applications</li>
                <li>• Database Systems</li>
                <li>• Programming and Software Development</li>
                <li>• Social and Ethical Issues</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'practice',
      title: t('dse.practice'),
      content: (
        <div className="space-y-6">
          {/* Topic Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setCurrentTopic(topic.id)
                  resetQuiz()
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentTopic === topic.id
                    ? `bg-${topic.color}-600 text-white`
                    : `bg-${topic.color}-100 dark:bg-${topic.color}-900/20 text-${topic.color}-800 dark:text-${topic.color}-200 hover:bg-${topic.color}-200 dark:hover:bg-${topic.color}-800/30`
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>

          {/* Quiz Stats */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-primary mb-1">Quiz Results</h4>
                  <p className="text-secondary">
                    You scored {getScore().correct} out of {getScore().total} questions correctly
                    ({Math.round((getScore().correct / getScore().total) * 100)}%)
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {getScore().correct}/{getScore().total}
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="mt-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Retake Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Questions */}
          <div className="space-y-6">
            {filteredQuestions.map((question, index) => {
              const selectedAnswer = selectedAnswers[question.id]
              const isCorrect = selectedAnswer === question.correctAnswer
              const hasAnswered = selectedAnswer !== undefined

              return (
                <div key={question.id} className="bg-tertiary rounded-lg p-6 border border-secondary">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-100 dark:bg-blue-800/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-blue-800 dark:text-blue-200">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-3">{question.question}</h4>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selectedAnswer === optionIndex
                          const isCorrectOption = optionIndex === question.correctAnswer
                          
                          return (
                            <button
                              key={optionIndex}
                              onClick={() => selectAnswer(question.id, optionIndex)}
                              disabled={showResults}
                              className={`w-full text-left p-3 rounded-lg border transition-all ${
                                showResults
                                  ? isCorrectOption
                                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                    : isSelected && !isCorrectOption
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'border-secondary bg-secondary'
                                  : isSelected
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                  : 'border-secondary bg-secondary hover:bg-primary hover:border-blue-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                  showResults
                                    ? isCorrectOption
                                      ? 'border-green-500 bg-green-500'
                                      : isSelected && !isCorrectOption
                                      ? 'border-red-500 bg-red-500'
                                      : 'border-gray-300'
                                    : isSelected
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}>
                                  {showResults && isCorrectOption && (
                                    <CheckCircle className="h-4 w-4 text-white" />
                                  )}
                                  {showResults && isSelected && !isCorrectOption && (
                                    <XCircle className="h-4 w-4 text-white" />
                                  )}
                                  {!showResults && isSelected && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                <span className="text-sm text-primary">{option}</span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                      
                      {showResults && hasAnswered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          transition={{ delay: 0.1 }}
                          className={`mt-4 p-3 rounded-lg ${
                            isCorrect 
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                          }`}
                        >
                          <p className={`text-sm ${
                            isCorrect ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                          }`}>
                            <strong>{isCorrect ? 'Correct!' : 'Incorrect.'}</strong> {question.explanation}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Submit Button */}
          {!showResults && Object.keys(selectedAnswers).length > 0 && (
            <div className="text-center">
              <button
                onClick={submitQuiz}
                className="primary-btn px-8 py-3 inline-flex items-center gap-2"
                disabled={Object.keys(selectedAnswers).length < filteredQuestions.length}
              >
                <CheckCircle className="h-5 w-5" />
                Submit Quiz
              </button>
              <p className="text-sm text-secondary mt-2">
                Answered {Object.keys(selectedAnswers).length} of {filteredQuestions.length} questions
              </p>
            </div>
          )}
        </div>
      )
    },
    {
      id: 'tips',
      title: t('dse.preparation'),
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-3">Before the Exam</h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <li>• Review past papers and marking schemes</li>
                <li>• Practice time management with mock exams</li>
                <li>• Focus on weak areas identified in practice</li>
                <li>• Understand key concepts rather than memorizing</li>
                <li>• Create summary notes for quick revision</li>
              </ul>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">During the Exam</h4>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                <li>• Read all questions carefully before starting</li>
                <li>• Allocate time based on marks per question</li>
                <li>• Answer easier questions first to build confidence</li>
                <li>• Show all working for calculation questions</li>
                <li>• Review answers if time permits</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Common Topics to Focus On</h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Systems & Architecture</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">CPU, memory hierarchy, I/O systems</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Software Development</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">SDLC, programming concepts, testing</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Database Systems</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">SQL, normalization, ER diagrams</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Networks & Internet</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">Protocols, web technologies, security</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Data Processing</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">Batch, online, real-time processing</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-800/30 rounded p-3">
                <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Social & Ethical</h5>
                <p className="text-xs text-blue-700 dark:text-blue-300">Privacy, copyright, digital divide</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-primary">
      <Header onAuthClick={() => setIsAuthModalOpen(true)} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
            {t('dse.title')}
          </h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Practice questions and study resources for the Hong Kong {t('dse.title')} examination
          </p>
        </motion.div>

        {/* DSE Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {dseSections.map((section, index) => (
            <div
              key={section.id}
              className="bg-secondary border border-secondary rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left hover:bg-tertiary transition-colors duration-200 flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                {expandedSections[section.id] ? (
                  <ChevronUp className="h-5 w-5 text-secondary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-secondary" />
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: expandedSections[section.id] ? 'auto' : 0,
                  opacity: expandedSections[section.id] ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-secondary">
                  {section.content}
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Exam Quick Facts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">5 Hours</div>
              <div className="text-sm text-secondary">Total exam duration</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">2 Papers</div>
              <div className="text-sm text-secondary">Compulsory + Elective</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">20%</div>
              <div className="text-sm text-secondary">SBA weighting</div>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-4">
              <RefreshCw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">Level 4</div>
              <div className="text-sm text-secondary">University entry requirement</div>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}