/**
 * Sync Context - Manages data synchronization across web and mobile
 * Integrates with Cloudflare Worker API for multi-platform sync
 */

'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'
import { syncService, type SyncData, type SyncUser } from '@/services/syncService'
import { useAuth } from './AuthContext'

interface SyncContextType {
  syncData: SyncData | null
  syncUser: SyncUser | null
  lastSyncTime: number
  isSyncing: boolean
  syncError: string | null
  syncNow: () => Promise<void>
  updateFavorites: (courseId: string, action: 'add' | 'remove') => Promise<void>
  updateLessonProgress: (lessonId: string, courseId: string, isCompleted: boolean, progress?: number) => Promise<void>
  submitQuiz: (lessonId: string, quizId: string, score: number, totalQuestions: number, correctAnswers: number, answers?: any[]) => Promise<void>
  autoSyncEnabled: boolean
  toggleAutoSync: (enabled: boolean) => void
}

const SyncContext = createContext<SyncContextType | undefined>(undefined)

const AUTO_SYNC_INTERVAL = 5 * 60 * 1000 // 5 minutes
const AUTO_SYNC_KEY = 'ict_auto_sync_enabled'

export function SyncProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [syncData, setSyncData] = useState<SyncData | null>(null)
  const [syncUser, setSyncUser] = useState<SyncUser | null>(null)
  const [lastSyncTime, setLastSyncTime] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [autoSyncEnabled, setAutoSyncEnabledState] = useState(true)

  // Load auto sync preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(AUTO_SYNC_KEY)
      if (saved !== null) {
        setAutoSyncEnabledState(saved === 'true')
      }
    }
  }, [])

  const toggleAutoSync = useCallback((enabled: boolean) => {
    setAutoSyncEnabledState(enabled)
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTO_SYNC_KEY, enabled.toString())
    }
  }, [])

  const syncNow = useCallback(async () => {
    if (!isAuthenticated || isSyncing) return

    setIsSyncing(true)
    setSyncError(null)

    try {
      // Pull latest data from server
      const data = await syncService.fullSync()
      setSyncData(data)
      setLastSyncTime(Date.now())

      // Get user profile
      const user = await syncService.getCurrentUser()
      setSyncUser(user)

      console.log('Sync completed successfully')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sync failed'
      setSyncError(errorMessage)
      console.error('Sync error:', error)
    } finally {
      setIsSyncing(false)
    }
  }, [isAuthenticated, isSyncing])

  // Initial sync when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      syncNow()
    } else {
      setSyncData(null)
      setSyncUser(null)
    }
  }, [isAuthenticated, user, syncNow])

  // Auto sync interval
  useEffect(() => {
    if (!isAuthenticated || !autoSyncEnabled) return

    const interval = setInterval(() => {
      syncNow()
    }, AUTO_SYNC_INTERVAL)

    return () => clearInterval(interval)
  }, [isAuthenticated, autoSyncEnabled, syncNow])

  // Sync on visibility change (when tab becomes active)
  useEffect(() => {
    if (!isAuthenticated || !autoSyncEnabled) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const timeSinceLastSync = Date.now() - lastSyncTime
        // Sync if more than 1 minute since last sync
        if (timeSinceLastSync > 60 * 1000) {
          syncNow()
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isAuthenticated, autoSyncEnabled, lastSyncTime, syncNow])

  // ============ DATA OPERATIONS ============

  const updateFavorites = useCallback(async (courseId: string, action: 'add' | 'remove') => {
    if (!isAuthenticated) return

    try {
      if (action === 'add') {
        await syncService.addFavorite(courseId)
      } else {
        await syncService.removeFavorite(courseId)
      }

      // Update local state
      setSyncData(prev => {
        if (!prev) return null
        
        const favorites = action === 'add'
          ? [...prev.favorites, { courseId, createdAt: Date.now() }]
          : prev.favorites.filter(f => f.courseId !== courseId)

        return { ...prev, favorites }
      })

      // Trigger sync to ensure data is up to date
      setTimeout(() => syncNow(), 1000)
    } catch (error) {
      console.error('Error updating favorites:', error)
      throw error
    }
  }, [isAuthenticated, syncNow])

  const updateLessonProgress = useCallback(async (
    lessonId: string, 
    courseId: string, 
    isCompleted: boolean,
    progress?: number
  ) => {
    if (!isAuthenticated) return

    try {
      await syncService.updateProgress(lessonId, {
        courseId,
        lessonId,
        isCompleted,
        progressPercentage: progress || (isCompleted ? 100 : 0),
        timeSpentSeconds: 0,
        lastAccessedAt: Date.now(),
        completedAt: isCompleted ? Date.now() : undefined,
      })

      // Update local state
      setSyncData(prev => {
        if (!prev) return null
        
        const existingIndex = prev.progress.findIndex(p => p.lessonId === lessonId)
        const newProgress = {
          courseId,
          lessonId,
          isCompleted,
          progressPercentage: progress || (isCompleted ? 100 : 0),
          timeSpentSeconds: 0,
          lastAccessedAt: Date.now(),
          completedAt: isCompleted ? Date.now() : undefined,
        }

        const progressArray = existingIndex >= 0
          ? prev.progress.map((p, i) => i === existingIndex ? newProgress : p)
          : [...prev.progress, newProgress]

        return { ...prev, progress: progressArray }
      })

      // Trigger background sync
      setTimeout(() => syncNow(), 1000)
    } catch (error) {
      console.error('Error updating progress:', error)
      throw error
    }
  }, [isAuthenticated, syncNow])

  const submitQuiz = useCallback(async (
    lessonId: string,
    quizId: string,
    score: number,
    totalQuestions: number,
    correctAnswers: number,
    answers?: any[]
  ) => {
    if (!isAuthenticated) return

    try {
      await syncService.submitQuizAttempt({
        lessonId,
        quizId,
        score,
        totalQuestions,
        correctAnswers,
        timeTakenSeconds: 0,
        answers,
        createdAt: Date.now(),
      })

      // Trigger sync to update stats
      setTimeout(() => syncNow(), 1000)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      throw error
    }
  }, [isAuthenticated, syncNow])

  return (
    <SyncContext.Provider
      value={{
        syncData,
        syncUser,
        lastSyncTime,
        isSyncing,
        syncError,
        syncNow,
        updateFavorites,
        updateLessonProgress,
        submitQuiz,
        autoSyncEnabled,
        toggleAutoSync,
      }}
    >
      {children}
    </SyncContext.Provider>
  )
}

export function useSync() {
  const context = useContext(SyncContext)
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider')
  }
  return context
}
