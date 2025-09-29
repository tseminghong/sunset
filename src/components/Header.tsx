'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, Menu, X, User, Bell, Globe } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onAuthClick: () => void
}

export default function Header({ onAuthClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false)
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState<Array<{
    id: number
    title: string
    message: string
    time: string
    unread: boolean
    timestamp: number
  }>>([])

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/courses', label: t('nav.resources') },
    { href: '/about', label: t('nav.about') },
  ]

  // Initialize notifications from localStorage
  useEffect(() => {
    const loadNotifications = () => {
      try {
        const stored = localStorage.getItem('hpcss_notifications')
        if (stored) {
          const parsedNotifications = JSON.parse(stored)
          setNotifications(parsedNotifications)
        } else {
          // Default notifications with the newest first
          const defaultNotifications = [
            { 
              id: 4, 
              title: 'Platform Rebuilt with Next.js', 
              message: 'Complete platform rebuild using Next.js 15, TypeScript, and modern React patterns. Enhanced performance, better user experience, and improved accessibility features.', 
              time: 'Just now', 
              unread: true, 
              timestamp: Date.now() 
            },
            { 
              id: 1, 
              title: 'New DSE Questions Added', 
              message: 'Check out 5 new practice questions covering advanced database concepts and SQL optimization techniques.', 
              time: '2h ago', 
              unread: true, 
              timestamp: Date.now() - 2 * 60 * 60 * 1000 
            },
            { 
              id: 2, 
              title: 'JavaScript Course Updated', 
              message: 'New interactive lessons on async programming, promises, and modern ES6+ features with live code editor.', 
              time: '1d ago', 
              unread: true, 
              timestamp: Date.now() - 24 * 60 * 60 * 1000 
            },
            { 
              id: 3, 
              title: 'Python Algorithms Visualizer', 
              message: 'Interactive visualizations for sorting and searching algorithms with step-by-step execution and code highlighting.', 
              time: '2d ago', 
              unread: false, 
              timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 
            },
          ]
          setNotifications(defaultNotifications)
          localStorage.setItem('hpcss_notifications', JSON.stringify(defaultNotifications))
        }
      } catch (error) {
        console.error('Error loading notifications:', error)
      }
    }

    loadNotifications()
  }, [])

  // Save notifications to localStorage whenever notifications change
  useEffect(() => {
    if (notifications.length > 0) {
      try {
        localStorage.setItem('hpcss_notifications', JSON.stringify(notifications))
      } catch (error) {
        console.error('Error saving notifications:', error)
      }
    }
  }, [notifications])

  const unreadCount = notifications.filter(n => n.unread).length

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    )
  }

  const clearAllNotifications = () => {
    setNotifications([])
    localStorage.removeItem('hpcss_notifications')
  }

  const formatTime = (timestamp: number) => {
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

  const handleUserMenuClick = () => {
    if (user) {
      setIsUserMenuOpen(!isUserMenuOpen)
    } else {
      onAuthClick()
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="glass-effect sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">HPCSS ICT</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
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

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect flex items-center gap-1"
                aria-label="Change language"
              >
                <Globe className="h-5 w-5" />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>

              {/* Language dropdown menu */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-secondary border border-secondary rounded-2xl p-2 shadow-lg z-50">
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setIsLanguageMenuOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-xl transition-colors flex items-center gap-2",
                      language === 'en' 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" 
                        : "text-secondary hover:bg-tertiary hover:text-primary"
                    )}
                  >
                    <span className="text-base">🇺🇸</span>
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('zh')
                      setIsLanguageMenuOpen(false)
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm rounded-xl transition-colors flex items-center gap-2",
                      language === 'zh' 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200" 
                        : "text-secondary hover:bg-tertiary hover:text-primary"
                    )}
                  >
                    <span className="text-base">🇨🇳</span>
                    中文
                  </button>
                </div>
              )}
            </div>
            {/* Notification button */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
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

              {/* Notification dropdown menu */}
              {isNotificationMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-96 bg-secondary border border-secondary rounded-2xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-secondary flex justify-between items-center">
                    <h3 className="font-semibold text-primary">Notifications</h3>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                      <button
                        onClick={clearAllNotifications}
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
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "px-4 py-3 border-b border-secondary/50 hover:bg-tertiary transition-colors cursor-pointer group",
                            notification.unread && "bg-blue-50 dark:bg-blue-900/20"
                          )}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-primary text-sm pr-2">{notification.title}</h4>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs text-secondary">{formatTime(notification.timestamp)}</span>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-secondary leading-relaxed">{notification.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="px-4 py-3 border-t border-secondary bg-tertiary/50">
                      <div className="flex justify-between items-center text-xs text-secondary">
                        <span>{notifications.length} notification{notifications.length !== 1 ? 's' : ''}</span>
                        {unreadCount > 0 && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-all duration-300 btn-press-effect"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* Auth button */}
            <div className="relative">
              <button
                onClick={handleUserMenuClick}
                className={cn(
                  "btn-press-effect transition-all duration-300",
                  user
                    ? "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-secondary hover:text-primary border border-secondary font-semibold text-sm"
                    : "primary-btn px-6 py-2"
                )}
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

              {/* User dropdown menu */}
              {user && isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-secondary border border-secondary rounded-2xl p-2 shadow-lg z-50">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false)
                      onAuthClick()
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-secondary hover:bg-tertiary hover:text-primary rounded-xl transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-secondary hover:text-primary hover:bg-tertiary transition-colors btn-press-effect"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary">
            {navLinks.map((link) => (
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

      {/* Click outside to close menus */}
      {(isUserMenuOpen || isNotificationMenuOpen || isLanguageMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsUserMenuOpen(false)
            setIsNotificationMenuOpen(false)
            setIsLanguageMenuOpen(false)
          }}
        />
      )}
    </header>
  )
}