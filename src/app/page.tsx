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
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="hero-gradient hero-fullscreen text-center py-20 md:py-28 rounded-3xl mb-16 md:mb-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
      </div>
      <div className="relative z-10 space-y-6 px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">
          {t('hero.title')}
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-secondary">
          {t('hero.subtitle')}
        </p>
        <p className="text-secondary text-sm uppercase tracking-widest">{t('hero.beta')}</p>
        <a
          href="/ict-v1.1.0.apk"
          download="ICT-Revision-Hub-v1.1.0.apk"
          className="primary-btn inline-block px-10 py-3 text-lg btn-press-effect"
        >
          {t('hero.download')}
        </a>
      </div>
    </motion.section>
  )

  const renderSearchBar = () => {
    if (!searchPortalTarget) return null

    return createPortal(
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        className="pointer-events-none fixed left-4 right-4 z-40 flex justify-center"
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="pointer-events-auto w-full max-w-md glass-effect rounded-full relative btn-press-effect">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-tertiary">
            <Search className="h-5 w-5" />
          </div>
          <input
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
            placeholder="Search resources..."
            className="w-full bg-transparent border-none outline-none pl-14 pr-6 py-4 text-primary placeholder-tertiary font-medium"
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
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                HPCSS ICT
              </Link>
            </div>
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-secondary hover:text-primary font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(prev => !prev)}
                  className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect flex items-center gap-1"
                  aria-label="Change language"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase">{language}</span>
                </button>
                {isLanguageMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-32 bg-secondary border border-secondary rounded-2xl p-2 shadow-lg z-50">
                    <button
                      onClick={() => {
                        setLanguage('en')
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors flex items-center gap-2 ${
                        language === 'en'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                          : 'text-secondary hover:bg-tertiary hover:text-primary'
                      }`}
                    >
                      <span className="text-base">🇺🇸</span>
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('zh')
                        setIsLanguageMenuOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-colors flex items-center gap-2 ${
                        language === 'zh'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                          : 'text-secondary hover:bg-tertiary hover:text-primary'
                      }`}
                    >
                      <span className="text-base">🇨🇳</span>
                      中文
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsNotificationMenuOpen(prev => !prev)}
                  className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                {isNotificationMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-96 bg-secondary border border-secondary rounded-2xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-secondary flex justify-between items-center">
                      <h3 className="font-semibold text-primary">Notifications</h3>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Mark all read
                          </button>
                        )}
                        <button
                          onClick={clearNotifications}
                          className="text-xs text-red-600 hover:text-red-800 font-medium"
                        >
                          Clear all
                        </button>
                      </div>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-secondary">
                          <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-secondary/50 hover:bg-tertiary transition-colors cursor-pointer ${notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium text-primary text-sm pr-2">{notification.title}</h4>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-xs text-secondary">{formatTimestamp(notification.timestamp)}</span>
                                {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              </div>
                            </div>
                            <p className="text-sm text-secondary leading-relaxed">{notification.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="px-4 py-3 border-t border-secondary bg-tertiary/50 text-xs text-secondary flex justify-between">
                        <span>{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</span>
                        {unreadCount > 0 && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
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
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect"
                aria-label="Toggle theme"
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
            className="text-3xl sm:text-4xl font-bold mb-8 md:mb-10 text-center sm:text-left text-primary"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Resources
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => {
              const tags = resource.tags.split(',').map(tag => tag.trim())
              const progress = getResourceProgress(resource)
              const isExternal = resource.href.startsWith('http') || resource.href.endsWith('.html') || resource.href.endsWith('.apk')
              const cardContent = (
                <motion.div
                  className="resource-card glass-effect rounded-[1.75rem] overflow-hidden cursor-pointer btn-press-effect group h-full transition-transform duration-300"
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-[180px] bg-tertiary flex items-center justify-center overflow-hidden">
                    <div
                      className="w-12 h-12 text-tertiary opacity-70"
                      dangerouslySetInnerHTML={{ __html: resource.icon }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-3 text-primary transition-colors duration-200 group-hover:text-blue-600">
                      {resource.title}
                    </h3>
                    <p className="text-secondary text-sm mb-4 flex-grow">
                      {resource.description}
                    </p>
                    {resource.progressKey && resource.totalLessons && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium text-tertiary">Progress</span>
                          <span className="text-xs font-medium text-tertiary">{progress}%</span>
                        </div>
                        <div className="w-full bg-tertiary rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-tertiary text-secondary text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium text-sm">{resource.linkText}</span>
                      <ExternalLink className="w-4 h-4 text-blue-600" />
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
                    className="block h-full"
                  >
                    {cardContent}
                  </a>
                )
              }

              return (
                <Link key={resource.href} href={resource.href} className="block h-full">
                  {cardContent}
                </Link>
              )
            })}
          </div>
          {filteredResources.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-secondary text-lg">No resources found matching your criteria.</p>
            </motion.div>
          )}
        </motion.section>

        <motion.section
          id="about"
          className="bg-secondary border border-secondary py-16 md:py-20 rounded-3xl mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary">About ICT Revision Hub</h2>
              <p className="text-secondary text-lg leading-relaxed">
                Welcome to the HPCSS ICT Revision Hub - your comprehensive resource for mastering Information and Communication Technology concepts. Our platform offers interactive learning materials, visual algorithms, and practical exercises designed to help students excel in their ICT studies.
              </p>
              <p className="text-secondary leading-relaxed">
                From programming fundamentals to database management, our curated collection of resources provides step-by-step guidance and hands-on experience to build your confidence in ICT.
              </p>
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
