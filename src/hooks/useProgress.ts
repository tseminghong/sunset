import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  getUserProgress, 
  getQuizScores, 
  updateTopicProgress,
  getUserDashboardStats
} from '@/services/progressService'

interface UserProgress {
  topic_id: string
  status: 'started' | 'in-progress' | 'completed'
  progress_percentage: number
  last_accessed: string
}

interface DashboardStats {
  completedTopics: number
  totalTopics: number
  completionPercentage: number
  avgQuizScore: number
  totalQuizAttempts: number
}

export function useUserProgress(userId?: string) {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [quizScores, setQuizScores] = useState<any[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch progress
        const progressResult = await getUserProgress(userId)
        if (progressResult.success) {
          setProgress(progressResult.progress)
        }

        // Fetch quiz scores
        const scoresResult = await getQuizScores(userId)
        if (scoresResult.success) {
          setQuizScores(scoresResult.scores)
        }

        // Fetch dashboard stats
        const statsResult = await getUserDashboardStats(userId)
        if (statsResult.success) {
          setStats({
            completedTopics: statsResult.completedTopics,
            totalTopics: statsResult.totalTopics,
            completionPercentage: statsResult.completionPercentage,
            avgQuizScore: statsResult.avgQuizScore,
            totalQuizAttempts: statsResult.totalQuizAttempts
          })
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load progress'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()

    // Subscribe to real-time updates
    const channel = supabase
      .channel('topic_progress_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'topic_progress',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          if (payload.new && (payload.new as any).user_id === userId) {
            setProgress(prev => {
              const index = prev.findIndex(p => p.topic_id === (payload.new as any).topic_id)
              if (index >= 0) {
                const updated = [...prev]
                updated[index] = payload.new as UserProgress
                return updated
              }
              return [...prev, payload.new as UserProgress]
            })
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [userId])

  return { progress, quizScores, stats, loading, error }
}

/**
 * Hook to update topic progress
 */
export function useUpdateProgress(userId?: string) {
  const updateProgress = async (
    topicId: string,
    status: 'started' | 'in-progress' | 'completed'
  ) => {
    if (!userId) {
      return { success: false, error: 'User not authenticated' }
    }

    const result = await updateTopicProgress(userId, topicId, status)
    return result
  }

  return { updateProgress }
}

/**
 * Hook to get progress for specific topics
 */
export function useTopicProgress(userId?: string, topicIds?: string[]) {
  const [topicProgress, setTopicProgress] = useState<Map<string, UserProgress>>(new Map())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId || !topicIds) {
      setLoading(false)
      return
    }

    const fetchTopicProgress = async () => {
      try {
        setLoading(true)
        const result = await getUserProgress(userId)
        
        if (result.success) {
          const progressMap = new Map<string, UserProgress>()
          result.progress.forEach(p => {
            if (topicIds.includes(p.topic_id)) {
              progressMap.set(p.topic_id, p)
            }
          })
          setTopicProgress(progressMap)
        }
      } catch (err) {
        console.error('Error fetching topic progress:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTopicProgress()
  }, [userId, topicIds])

  return { topicProgress, loading }
}

/**
 * Hook to get user's dashboard statistics
 */
export function useDashboardStats(userId?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await getUserDashboardStats(userId)
        
        if (result.success) {
          setStats({
            completedTopics: result.completedTopics,
            totalTopics: result.totalTopics,
            completionPercentage: result.completionPercentage,
            avgQuizScore: result.avgQuizScore,
            totalQuizAttempts: result.totalQuizAttempts
          })
        } else {
          setError('Failed to load statistics')
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load statistics'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [userId])

  return { stats, loading, error }
}
