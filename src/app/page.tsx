'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon,
  Sun,
  Menu,
  X,
  User,
  Bell,
  Globe,
  Search,
  ExternalLink,
  Lock
} from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { resourcesData, allTags } from '@/data/resources'
import { ResourceData } from '@/types'

type Notification = {
  id: number
  title: string
  message: string
  time: string
  unread: boolean
  timestamp: number
}

export default function HomePage() {
  const { theme, toggleTheme } = useTheme()
  const { user, login, signup, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const [activeTag, setActiveTag] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [searchPortalTarget, setSearchPortalTarget] = useState<HTMLElement | null>(null)
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin')
  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  const [authFeedback, setAuthFeedback] = useState<{
    type: 'error' | 'success' | null
    message: string
  }>({ type: null, message: '' })
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const navLinks = useMemo(() => ([
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.resources') },
    { href: '/about', label: t('nav.about') },
  ]), [t])

  const filteredResources = useMemo(() => {
    return resourcesData.filter(resource => {
      const matchesTag = activeTag === 'all' || resource.tags.includes(activeTag)
      const lowerSearch = searchTerm.toLowerCase()
      const matchesSearch = searchTerm === '' ||
        resource.title.toLowerCase().includes(lowerSearch) ||
        resource.description.toLowerCase().includes(lowerSearch) ||
        resource.tags.toLowerCase().includes(lowerSearch)

      return matchesTag && matchesSearch
    })
  }, [activeTag, searchTerm])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setSearchPortalTarget(document.body)
      
      // Comic book style: Instant scrolling, no smooth animations
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem('hpcss_notifications')
      if (stored) {
        setNotifications(JSON.parse(stored))
        return
      }
    } catch {
      // ignore
    }

    const defaultNotifications: Notification[] = [
      {
        id: 4,
        title: 'Platform Rebuilt with Next.js',
        message: 'Complete platform rebuild using Next.js 15, TypeScript, and modern React patterns.',
        time: 'Just now',
        unread: true,
        timestamp: Date.now()
      },
      {
        id: 1,
        title: 'New DSE Questions Added',
        message: 'Fresh practice questions covering advanced database concepts and SQL optimization.',
        time: '2h ago',
        unread: true,
        timestamp: Date.now() - 2 * 60 * 60 * 1000
      },
      {
        id: 2,
        title: 'JavaScript Course Updated',
        message: 'New lessons on async programming, promises, and modern ES6+ features.',
        time: '1d ago',
        unread: true,
        timestamp: Date.now() - 24 * 60 * 60 * 1000
      },
      {
        id: 3,
        title: 'Python Algorithms Visualizer',
        message: 'Interactive visualizations for sorting and searching algorithms.',
        time: '2d ago',
        unread: false,
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
      }
    ]

    setNotifications(defaultNotifications)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('hpcss_notifications', JSON.stringify(defaultNotifications))
      } catch {
        // ignore
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (notifications.length === 0) return

    try {
      localStorage.setItem('hpcss_notifications', JSON.stringify(notifications))
    } catch {
      // ignore
    }
  }, [notifications])

  useEffect(() => {
    if (user && isAuthModalOpen) {
      setIsAuthModalOpen(false)
    }
  }, [user, isAuthModalOpen])

  const unreadCount = notifications.filter(n => n.unread).length

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(notification => (
      notification.id === id ? { ...notification, unread: false } : notification
    )))
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, unread: false })))
  }

  const clearNotifications = () => {
    setNotifications([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hpcss_notifications')
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const handleUserButtonClick = () => {
    if (user) {
      setIsUserMenuOpen(prev => !prev)
      return
    }
    setIsAuthModalOpen(true)
  }

  const getResourceProgress = (resource: ResourceData) => {
    if (!resource.progressKey || !resource.totalLessons) return 0
    if (typeof window === 'undefined') return 0
    const currentLesson = localStorage.getItem(resource.progressKey)
    if (!currentLesson) return 0
    const lessonNum = parseInt(currentLesson, 10)
    if (Number.isNaN(lessonNum)) return 0
    return Math.min(100, Math.round((lessonNum / resource.totalLessons) * 100))
  }

  const closeAllMenus = () => {
    setIsUserMenuOpen(false)
    setIsNotificationMenuOpen(false)
    setIsLanguageMenuOpen(false)
  }

  const handleAuthInput = (field: 'username' | 'password' | 'confirmPassword', value: string) => {
    setAuthForm(prev => ({ ...prev, [field]: value }))
    setAuthFeedback({ type: null, message: '' })
  }

  const handleAuthTabChange = (tab: 'signin' | 'signup') => {
    setAuthTab(tab)
    setAuthFeedback({ type: null, message: '' })
    setAuthForm({ username: '', password: '', confirmPassword: '' })
  }

  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsAuthLoading(true)
    setAuthFeedback({ type: null, message: '' })

    try {
      if (authTab === 'signup') {
        if (authForm.password !== authForm.confirmPassword) {
          setAuthFeedback({ type: 'error', message: 'Passwords do not match' })
          setIsAuthLoading(false)
          return
        }

        if (authForm.password.length < 8) {
          setAuthFeedback({ type: 'error', message: 'Password too short (minimum 8 characters)' })
          setIsAuthLoading(false)
          return
        }

        const result = await signup(authForm.username, authForm.password)
        if (result.success) {
          setAuthFeedback({ type: 'success', message: 'Account created! You can now sign in.' })
          setTimeout(() => handleAuthTabChange('signin'), 1500)
        } else {
          setAuthFeedback({ type: 'error', message: result.error || 'Signup failed' })
        }
      } else {
        const result = await login(authForm.username, authForm.password)
        if (result.success) {
          setAuthFeedback({ type: 'success', message: 'Signed in successfully!' })
        } else {
          setAuthFeedback({ type: 'error', message: result.error || 'Login failed' })
        }
      }
    } catch {
      setAuthFeedback({ type: 'error', message: 'An unexpected error occurred. Please try again.' })
    }

    setIsAuthLoading(false)
  }

  const renderHero = () => (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="hero-gradient hero-fullscreen text-center py-20 md:py-28 mb-16 md:mb-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>
      <div className="relative z-10 space-y-8 px-4 max-w-5xl mx-auto">
        <h1 className="hero-title">
          HP ICT
        </h1>
        <p className="hero-subtitle max-w-3xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
        >
          <a
            href="/ict-v1.1.0.apk"
            download="ICT-Revision-Hub-v1.1.0.apk"
            className="btn-rainbow touch-target inline-flex items-center gap-2 px-8 py-4 text-lg font-bold shadow-2xl"
          >
            {t('hero.download')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
          <button
            onClick={() => {
              const section = document.getElementById('resources-section');
              if (section) {
                section.scrollIntoView({ behavior: 'auto', block: 'start' }); // Instant snap
              }
            }}
            className="btn-outline-rainbow touch-target inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold"
          >
            Explore Resources
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.section>
  )

  const renderSearchBar = () => {
    if (!searchPortalTarget) return null

    return createPortal(
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        className="pointer-events-none fixed left-4 right-4 z-40 flex justify-center"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="pointer-events-auto w-full max-w-md glass-effect rounded-full relative shadow-xl">
          <label htmlFor="search-input" className="sr-only">Search resources</label>
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-tertiary pointer-events-none" aria-hidden="true">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="search-input"
            type="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search resources..."
            className="w-full bg-transparent border-none outline-none pl-14 pr-6 py-4 text-primary placeholder-tertiary font-medium rounded-full"
            aria-label="Search resources"
            autoComplete="off"
          />
        </div>
      </motion.div>,
      searchPortalTarget
    )
  }

  const renderAuthModal = () => (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{
              background: 'var(--modal-backdrop)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
            onClick={() => setIsAuthModalOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100, rotate: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-effect w-full max-w-md rounded-2xl relative z-10 p-6"
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-tertiary hover:text-primary transition-colors btn-press-effect"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-6 text-primary">Account</h3>
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleAuthTabChange('signin')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold border tracking-wide transition-all duration-300 ${
                  authTab === 'signin'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-tertiary text-secondary border-secondary hover:border-tertiary'
                }`}
              >
                {t('auth.signin')}
              </button>
              <button
                onClick={() => handleAuthTabChange('signup')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold border tracking-wide transition-all duration-300 ${
                  authTab === 'signup'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-tertiary text-secondary border-secondary hover:border-tertiary'
                }`}
              >
                {t('auth.signup')}
              </button>
            </div>
            {authFeedback.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg mb-4 text-sm font-medium ${
                  authFeedback.type === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                    : 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                }`}
              >
                {authFeedback.message}
              </motion.div>
            )}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {t('auth.username')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" />
                  <input
                    type="text"
                    value={authForm.username}
                    onChange={event => handleAuthInput('username', event.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isAuthLoading}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" />
                  <input
                    type="password"
                    value={authForm.password}
                    onChange={event => handleAuthInput('password', event.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isAuthLoading}
                  />
                </div>
              </div>
              {authTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-tertiary" />
                    <input
                      type="password"
                      value={authForm.confirmPassword}
                      onChange={event => handleAuthInput('confirmPassword', event.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={isAuthLoading}
                    />
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full primary-btn py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthLoading ? t('common.loading') : (authTab === 'signin' ? t('auth.signin') : t('auth.signup'))}
              </button>
            </form>
            <p className="mt-6 text-[10px] text-secondary text-center">Powered by secure Worker auth API.</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="min-h-screen bg-primary">
      <header className="glass-effect sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-2xl font-bold transition-colors duration-200 hover:opacity-80"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                HPCSS ICT
              </Link>
            </div>
            <nav className="hidden md:block" aria-label="Main navigation">
              <div className="ml-10 flex items-baseline space-x-6">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-secondary hover:text-primary font-semibold transition-all duration-200 px-3 py-2 rounded-lg hover:bg-tertiary/50 touch-target"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllMenus();
                    setIsLanguageMenuOpen(prev => !prev);
                  }}
                  className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary/50 transition-all duration-200 flex items-center gap-1 touch-target"
                  aria-label="Change language"
                  aria-expanded={isLanguageMenuOpen}
                  aria-haspopup="true"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>{language}</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 glassmorphism-card p-2 shadow-xl z-50">
                    <button
                      onClick={() => {
                        setLanguage('en')
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 touch-target ${
                        language === 'en'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold'
                          : 'text-secondary hover:bg-tertiary/50 hover:text-primary'
                      }`}
                    >
                      <span className="text-lg">🇺🇸</span>
                      <span style={{ fontFamily: "'Poppins', sans-serif" }}>English</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('zh')
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 touch-target ${
                        language === 'zh'
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold'
                          : 'text-secondary hover:bg-tertiary/50 hover:text-primary'
                      }`}
                    >
                      <span className="text-lg">🇨🇳</span>
                      <span style={{ fontFamily: "'Poppins', sans-serif" }}>中文</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    closeAllMenus();
                    setIsNotificationMenuOpen(prev => !prev);
                  }}
                  className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary/50 transition-all duration-200 relative touch-target"
                  aria-label={`Notifications ${unreadCount > 0 ? `- ${unreadCount} unread` : ''}`}
                  aria-expanded={isNotificationMenuOpen}
                  aria-haspopup="true"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span 
                      className="absolute -top-0.5 -right-0.5 h-5 w-5 text-white text-xs rounded-full flex items-center justify-center font-bold"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--accent-error), #F87171)',
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '0.7rem'
                      }}
                      aria-live="polite"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>
                {isNotificationMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 glassmorphism-card shadow-2xl z-50 overflow-hidden max-h-[80vh] flex flex-col">
                    <div className="px-4 py-4 border-b border-secondary/30 flex justify-between items-center flex-shrink-0">
                      <h3 className="font-bold text-primary text-lg" style={{ fontFamily: "'Poppins', sans-serif" }}>Notifications</h3>
                      <div className="flex items-center gap-3">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-tertiary/50"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={clearNotifications}
                          className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                          style={{ color: 'var(--accent-error)' }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-12 text-center text-secondary">
                          <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                          <p className="font-medium">No notifications</p>
                          <p className="text-xs text-tertiary mt-1">You're all caught up!</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <button
                            key={notification.id}
                            className={`w-full text-left px-4 py-3 border-b border-secondary/30 hover:bg-tertiary/30 transition-colors touch-target ${notification.unread ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                            aria-label={`${notification.unread ? 'Unread notification: ' : ''}${notification.title}`}
                          >
                            <div className="flex justify-between items-start mb-1.5">
                              <h4 className="font-semibold text-primary text-sm pr-2 line-clamp-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-tertiary font-medium">{formatTimestamp(notification.timestamp)}</span>
                                {notification.unread && (
                                  <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ background: 'var(--accent-primary)' }}
                                    aria-label="Unread"
                                  />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-secondary leading-relaxed line-clamp-2">{notification.message}</p>
                          </button>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-3 border-t border-secondary/30 text-xs text-secondary flex justify-between items-center flex-shrink-0 bg-tertiary/20">
                        <span className="font-medium">{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</span>
                        {unreadCount > 0 && (
                          <span 
                            className="px-3 py-1 rounded-full text-white font-semibold text-xs"
                            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                          >
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary/50 transition-all duration-200 touch-target"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>
              <div className="relative">
                <button
                  onClick={handleUserButtonClick}
                  className={`btn-press-effect transition-all duration-300 ${
                    user
                      ? 'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-secondary hover:text-primary border border-secondary font-semibold text-sm'
                      : 'primary-btn px-6 py-2'
                  }`}
                >
                  {user ? (
                    <>
                      <User className="h-4 w-4" />
                      {user.username}
                    </>
                  ) : (
                    t('nav.login')
                  )}
                </button>
                {user && isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-44 bg-secondary border border-secondary rounded-2xl p-2 shadow-lg z-50">
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        setIsAuthModalOpen(true)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={async () => {
                        await logout()
                        setIsUserMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="md:hidden p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-colors btn-press-effect"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-secondary">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-secondary hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {(isUserMenuOpen || isNotificationMenuOpen || isLanguageMenuOpen) && (
          <div className="fixed inset-0 z-40" onClick={closeAllMenus} />
        )}
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {renderHero()}

        <motion.section
          className="mb-12 md:mb-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 border btn-press-effect ${
                  activeTag === tag
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                    : 'bg-secondary text-secondary border-secondary hover:text-primary hover:border-tertiary'
                }`}
                style={{ transitionDelay: `${0.1 * index}s` }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="resources"
          className="mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-8 md:mb-12 text-center sm:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Featured Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredResources.map((resource, index) => {
              const tags = resource.tags.split(',').map(tag => tag.trim())
              const progress = getResourceProgress(resource)
              const isExternal = resource.href.startsWith('http') || resource.href.endsWith('.html') || resource.href.endsWith('.apk')
              const cardContent = (
                <motion.div
                  className="glassmorphism-card card-hover-lift h-full flex flex-col group"
                  style={{
                    border: '4px solid rgba(0, 0, 0, 0.2)',
                    borderRadius: '2rem',
                    boxShadow: '8px 8px 0px rgba(0, 0, 0, 0.1)'
                  }}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                >
                  <div className="h-[160px] relative overflow-hidden flex items-center justify-center" style={{ borderRadius: '1.75rem 1.75rem 0 0' }}>
                    {/* Vibrant gradient background with color variety */}
                    <div 
                      className="absolute inset-0 opacity-90"
                      style={{
                        background: [
                          'linear-gradient(135deg, #EC4899 0%, #A855F7 100%)', // Pink to Purple
                          'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)', // Blue to Cyan
                          'linear-gradient(135deg, #10B981 0%, #14B8A6 100%)', // Green to Teal
                          'linear-gradient(135deg, #F97316 0%, #EC4899 100%)', // Orange to Pink
                          'linear-gradient(135deg, #A855F7 0%, #3B82F6 100%)', // Purple to Blue
                          'linear-gradient(135deg, #06B6D4 0%, #10B981 100%)', // Cyan to Green
                        ][index % 6]
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent" />
                    </div>
                    <div
                      className="w-16 h-16 text-white opacity-95 relative z-10 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg"
                      dangerouslySetInnerHTML={{ __html: resource.icon }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-primary transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 group-hover:bg-clip-text group-hover:text-transparent" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {resource.title}
                    </h3>
                    <p className="text-secondary text-sm mb-4 flex-grow line-clamp-3">
                      {resource.description}
                    </p>
                    {resource.progressKey && resource.totalLessons && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-semibold text-tertiary uppercase tracking-wide">Progress</span>
                          <span className="text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{progress}%</span>
                        </div>
                        <div className="w-full bg-tertiary rounded-full h-2.5 overflow-hidden relative shadow-inner">
                          <div 
                            className="h-full transition-all duration-500 ease-out relative"
                            style={{ 
                              width: `${progress}%`,
                              background: [
                                'linear-gradient(90deg, #EC4899 0%, #A855F7 100%)',
                                'linear-gradient(90deg, #3B82F6 0%, #06B6D4 100%)',
                                'linear-gradient(90deg, #10B981 0%, #14B8A6 100%)',
                                'linear-gradient(90deg, #F97316 0%, #EC4899 100%)',
                                'linear-gradient(90deg, #A855F7 0%, #3B82F6 100%)',
                                'linear-gradient(90deg, #06B6D4 0%, #10B981 100%)',
                              ][index % 6]
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="badge badge-primary text-xs px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="badge badge-primary text-xs px-3 py-1">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-secondary/30">
                      <span className="font-semibold text-sm" style={{ color: 'var(--accent-primary)', fontFamily: "'Poppins', sans-serif" }}>
                        {resource.linkText}
                      </span>
                      <div className="transform group-hover:translate-x-1 transition-transform duration-200">
                        <ExternalLink className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )

              if (isExternal) {
                return (
                  <a
                    key={resource.href}
                    href={resource.href}
                    target={resource.href.startsWith('http') ? '_blank' : '_self'}
                    rel={resource.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full touch-target"
                    aria-label={`View ${resource.title}`}
                  >
                    {cardContent}
                  </a>
                )
              }

              return (
                <Link 
                  key={resource.href} 
                  href={resource.href} 
                  className="block h-full touch-target"
                  aria-label={`View ${resource.title}`}
                >
                  {cardContent}
                </Link>
              )
            })}
          </div>
          {filteredResources.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="text-center py-20 glassmorphism-card"
            >
              <div className="w-20 h-20 mx-auto mb-4 opacity-50">
                <Search className="w-full h-full text-secondary" />
              </div>
              <p className="text-secondary text-lg font-medium">No resources found matching your criteria.</p>
              <p className="text-tertiary text-sm mt-2">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="about"
          className="glassmorphism-card py-16 md:py-20 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{
                  fontFamily: "'Poppins', sans-serif",
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  About ICT Revision Hub
                </h2>
              </motion.div>
              <motion.p 
                className="text-secondary text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Welcome to the HPCSS ICT Revision Hub - your comprehensive resource for mastering Information and Communication Technology concepts. Our platform offers interactive learning materials, visual algorithms, and practical exercises designed to help students excel in their ICT studies.
              </motion.p>
              <motion.p 
                className="text-secondary leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                From programming fundamentals to database management, our curated collection of resources provides step-by-step guidance and hands-on experience to build your confidence in ICT.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8"
              >
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/30 dark:border-indigo-700/30">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-primary)', fontFamily: "'Poppins', sans-serif" }}>500+</div>
                  <div className="text-sm text-secondary font-medium">Learning Resources</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/30 dark:border-purple-700/30">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-secondary)', fontFamily: "'Poppins', sans-serif" }}>15+</div>
                  <div className="text-sm text-secondary font-medium">Interactive Topics</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-900/20 dark:to-orange-900/20 border border-pink-200/30 dark:border-pink-700/30">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'var(--accent-cta)', fontFamily: "'Poppins', sans-serif" }}>1000+</div>
                  <div className="text-sm text-secondary font-medium">Students Helped</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="transition"
          className="bg-secondary border border-secondary py-16 md:py-20 rounded-3xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <h1 className="text-3xl font-bold text-primary">Welcome to Our Learning Platform</h1>
            <p className="text-secondary text-lg leading-relaxed">
              Experience smooth animations as you explore our educational content.
            </p>
          </div>
        </motion.section>
      </main>

      <footer className="bg-secondary border-t border-secondary pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm">
            {[
              {
                title: 'Resources',
                links: [
                  { label: 'JavaScript', href: '/javascript' },
                  { label: 'Python', href: '/python' },
                  { label: 'Algorithms', href: '/algorithms' }
                ]
              },
              {
                title: 'Tools',
                links: [
                  { label: 'Visualizers', href: '/visualizers' },
                  { label: 'Practice', href: '/practice' },
                  { label: 'Downloads', href: '/downloads' }
                ]
              },
              {
                title: 'About',
                links: [
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Support', href: '/support' }
                ]
              },
              {
                title: 'Legal',
                links: [
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'License', href: '/license' }
                ]
              },
            ].map(section => (
              <div key={section.title}>
                <h4 className="font-semibold text-primary mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-secondary hover:text-blue-600 transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-secondary pt-8 text-center">
            <p className="text-secondary">© {new Date().getFullYear()} HPCSS ICT Revision Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {renderSearchBar()}
      {renderAuthModal()}
    </div>
  )
}
