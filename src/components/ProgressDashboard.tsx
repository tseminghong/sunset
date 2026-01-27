'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useDashboardStats } from '@/hooks/useProgress'
import { CheckCircle2, Award, BookOpen, Flame } from 'lucide-react'

export default function ProgressDashboard() {
  const { user } = useAuth()
  const { stats, loading, error } = useDashboardStats(user?.id)

  if (!user) {
    return (
      <div className="glassmorphism-card rounded-lg p-6 text-center">
        <p className="text-secondary">Sign in to view your progress</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="glassmorphism-card rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
          <div className="h-4 bg-white/10 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glassmorphism-card rounded-lg p-6 border border-red-500/30">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Overall Completion */}
      <div className="glassmorphism-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-secondary">Overall Progress</h3>
          <CheckCircle2 size={18} className="text-blue-400" />
        </div>
        <div className="mb-2">
          <p className="text-2xl font-bold text-primary">
            {stats.completionPercentage}%
          </p>
          <p className="text-xs text-secondary">
            {stats.completedTopics} of {stats.totalTopics} topics
          </p>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="glassmorphism-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-secondary">Avg Quiz Score</h3>
          <span className="text-lg font-bold text-green-400">
            {Math.round(stats.avgQuizScore)}%
          </span>
        </div>
        <p className="text-xs text-secondary">
          {stats.totalQuizAttempts} attempts
        </p>
      </div>

      {/* Topics Completed */}
      <div className="glassmorphism-card rounded-lg p-6">
        <h3 className="text-sm font-semibold text-secondary mb-3">Topics Completed</h3>
        <p className="text-3xl font-bold text-primary">
          {stats.completedTopics}
        </p>
        <p className="text-xs text-secondary mt-2">
          Keep up the great work! 🎉
        </p>
      </div>

      {/* Learning Streak (if available) */}
      <div className="glassmorphism-card rounded-lg p-6">
        <h3 className="text-sm font-semibold text-secondary mb-3">Study Streak</h3>
        <p className="text-3xl font-bold text-yellow-400">
          {stats.totalQuizAttempts > 0 ? '🔥' : '🌟'}
        </p>
        <p className="text-xs text-secondary mt-2">
          {stats.totalQuizAttempts > 0 ? 'You\'re on fire!' : 'Start learning today!'}
        </p>
      </div>
    </div>
  )
}
