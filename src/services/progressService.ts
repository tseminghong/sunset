import { supabase } from '@/lib/supabase'

/**
 * Record progress on a topic for a user
 */
export const updateTopicProgress = async (
  userId: string,
  topicId: string,
  status: 'started' | 'in-progress' | 'completed'
) => {
  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .upsert({
        user_id: userId,
        topic_id: topicId,
        status,
        last_accessed: new Date().toISOString()
      }, {
        onConflict: 'user_id,topic_id'
      })
      .select()

    if (error) {
      console.error('Error updating topic progress:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Get all progress for a user
 */
export const getUserProgress = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('topic_progress')
      .select('*')
      .eq('user_id', userId)
      .order('last_accessed', { ascending: false })

    if (error) {
      return { success: false, progress: [] }
    }

    return { success: true, progress: data || [] }
  } catch (error) {
    console.error('Error getting user progress:', error)
    return { success: false, progress: [] }
  }
}

/**
 * Record a quiz attempt
 */
export const recordQuizScore = async (
  userId: string,
  quizId: string,
  score: number,
  totalQuestions: number
) => {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .insert({
        user_id: userId,
        quiz_id: quizId,
        score,
        total_questions: totalQuestions,
        created_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Error recording quiz score:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}

/**
 * Get quiz scores for a user on a specific quiz
 */
export const getQuizScores = async (userId: string, quizId?: string) => {
  try {
    let query = supabase
      .from('quiz_scores')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (quizId) {
      query = query.eq('quiz_id', quizId)
    }

    const { data, error } = await query

    if (error) {
      return { success: false, scores: [] }
    }

    return { success: true, scores: data || [] }
  } catch (error) {
    console.error('Error getting quiz scores:', error)
    return { success: false, scores: [] }
  }
}

/**
 * Get average quiz score for a user
 */
export const getUserQuizStats = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('score, total_questions')
      .eq('user_id', userId)

    if (error) {
      return { 
        success: false, 
        average: 0, 
        totalAttempts: 0 
      }
    }

    if (!data || data.length === 0) {
      return { 
        success: true, 
        average: 0, 
        totalAttempts: 0 
      }
    }

    const totalScore = data.reduce((sum, item) => sum + item.score, 0)
    const average = Math.round((totalScore / (data.length * 100)) * 100)

    return { 
      success: true, 
      average, 
      totalAttempts: data.length 
    }
  } catch (error) {
    console.error('Error getting quiz stats:', error)
    return { 
      success: false, 
      average: 0, 
      totalAttempts: 0 
    }
  }
}

/**
 * Get user's learning dashboard stats
 */
export const getUserDashboardStats = async (userId: string) => {
  try {
    const progressResult = await getUserProgress(userId)
    const quizStatsResult = await getUserQuizStats(userId)

    const completedTopics = progressResult.progress?.filter(
      p => p.status === 'completed'
    ).length || 0

    const totalTopics = progressResult.progress?.length || 0

    return {
      success: true,
      completedTopics,
      totalTopics,
      completionPercentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      avgQuizScore: quizStatsResult.average,
      totalQuizAttempts: quizStatsResult.totalAttempts
    }
  } catch (error) {
    console.error('Error getting dashboard stats:', error)
    return {
      success: false,
      completedTopics: 0,
      totalTopics: 0,
      completionPercentage: 0,
      avgQuizScore: 0,
      totalQuizAttempts: 0
    }
  }
}
