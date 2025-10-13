'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X, User, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  })
  const [feedback, setFeedback] = useState<{
    type: 'error' | 'success' | null
    message: string
  }>({ type: null, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const { login, signup, user } = useAuth()

  useEffect(() => {
    if (user) {
      onClose()
    }
  }, [user, onClose])

  const clearFeedback = () => {
    setFeedback({ type: null, message: '' })
  }

  const handleTabChange = (tab: 'signin' | 'signup') => {
    setActiveTab(tab)
    clearFeedback()
    setFormData({ username: '', password: '', confirmPassword: '' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    clearFeedback()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    clearFeedback()

    try {
      if (activeTab === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          setFeedback({ type: 'error', message: 'Passwords do not match' })
          setIsLoading(false)
          return
        }
        if (formData.password.length < 8) {
          setFeedback({ type: 'error', message: 'Password too short (minimum 8 characters)' })
          setIsLoading(false)
          return
        }

        const result = await signup(formData.username, formData.password)
        if (result.success) {
          setFeedback({ type: 'success', message: 'Account created! You can now sign in.' })
          setTimeout(() => handleTabChange('signin'), 2000)
        } else {
          setFeedback({ type: 'error', message: result.error || 'Signup failed' })
        }
      } else {
        const result = await login(formData.username, formData.password)
        if (result.success) {
          setFeedback({ type: 'success', message: 'Signed in successfully!' })
          setTimeout(() => onClose(), 1000)
        } else {
          setFeedback({ type: 'error', message: result.error || 'Login failed' })
        }
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'An unexpected error occurred' })
    }

    setIsLoading(false)
  }

  // Don't render if not open
  if (!isOpen) return null

  // Render modal using portal (same as SimpleAuthModal that worked)
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
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
        onClick={onClose}
      />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100, rotate: -10 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="glass-effect w-full max-w-md rounded-2xl relative z-10 p-6"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-tertiary hover:text-primary transition-colors btn-press-effect"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h3 className="text-xl font-bold mb-6 text-primary">Account</h3>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => handleTabChange('signin')}
                className={cn(
                  "flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-300",
                  "border tracking-wide",
                  activeTab === 'signin'
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-tertiary text-secondary border-secondary hover:border-tertiary"
                )}
              >
                {t('auth.signin')}
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={cn(
                  "flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-300",
                  "border tracking-wide",
                  activeTab === 'signup'
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-tertiary text-secondary border-secondary hover:border-tertiary"
                )}
              >
                {t('auth.signup')}
              </button>
            </div>

            {/* Feedback */}
            {feedback.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-3 rounded-lg mb-4 text-sm font-medium",
                  feedback.type === 'error'
                    ? "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"
                    : "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                )}
              >
                {feedback.message}
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {t('auth.username')}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary" />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                  {t('auth.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Confirm Password (signup only) */}
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                    {t('auth.confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary bg-secondary text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full primary-btn py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('common.loading') : (activeTab === 'signin' ? t('auth.signin') : t('auth.signup'))}
              </button>
            </form>

          {/* Footer */}
          <p className="mt-6 text-[10px] text-secondary text-center">
            Powered by ICT Sync API
          </p>
        </motion.div>
      </div>,
    document.body
  )
}