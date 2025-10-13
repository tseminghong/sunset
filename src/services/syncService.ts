/**
 * ICT Revision Hub - Web Sync Service
 * TypeScript service for synchronizing user data with Cloudflare Worker API
 */

const SYNC_API_BASE = process.env.NEXT_PUBLIC_SYNC_API_URL || 'https://ict-sync-api.darrenintr.workers.dev'
const TOKEN_KEY = 'ict_sync_token'
const LAST_SYNC_KEY = 'ict_last_sync'
const DEVICE_ID_KEY = 'ict_device_id'

export interface SyncUser {
  id: string
  username: string
  email?: string
  displayName?: string
  avatarUrl?: string
}

export interface Favorite {
  id?: string
  courseId: string
  createdAt?: number
}

export interface LessonProgress {
  id?: string
  courseId: string
  lessonId: string
  isCompleted: boolean
  progressPercentage: number
  timeSpentSeconds: number
  lastAccessedAt?: number
  completedAt?: number
  notes?: string
}

export interface QuizAttempt {
  id?: string
  lessonId: string
  quizId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeTakenSeconds?: number
  attemptNumber?: number
  answers?: any[]
  createdAt?: number
}

export interface UserProfile {
  bio?: string
  gradeLevel?: string
  school?: string
  language?: string
  theme?: string
  notificationsEnabled?: boolean
  studyReminderTime?: string
  timezone?: string
}

export interface UserStats {
  totalCoursesStarted: number
  totalLessonsCompleted: number
  totalQuizzesTaken: number
  totalStudyTimeSeconds: number
  averageQuizScore: number
  currentStreakDays: number
  longestStreakDays: number
  lastActivityDate?: number
  totalPoints: number
  level: number
}

export interface SyncData {
  favorites: Favorite[]
  progress: LessonProgress[]
  quizzes: QuizAttempt[]
  profile?: UserProfile
  stats?: UserStats
}

class SyncService {
  private token: string | null = null
  private deviceId: string
  private syncInProgress = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(TOKEN_KEY)
      this.deviceId = this.getOrCreateDeviceId()
    } else {
      this.deviceId = 'server'
    }
  }

  private getOrCreateDeviceId(): string {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY)
    if (!deviceId) {
      deviceId = `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem(DEVICE_ID_KEY, deviceId)
    }
    return deviceId
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(LAST_SYNC_KEY)
    }
  }

  private async apiCall(path: string, options: RequestInit = {}): Promise<Response> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${SYNC_API_BASE}${path}`, {
      ...options,
      headers,
    })

    return response
  }

  // ============ AUTH ============

  async register(username: string, password: string, email?: string) {
    const response = await this.apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password, email }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Registration failed')
    }

    return data
  }

  async login(username: string, password: string) {
    const response = await this.apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Login failed')
    }

    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  async getCurrentUser(): Promise<SyncUser | null> {
    if (!this.token) return null

    try {
      const response = await this.apiCall('/api/me')
      
      if (!response.ok) return null
      
      const data = await response.json()
      return data.user
    } catch {
      return null
    }
  }

  // ============ FAVORITES ============

  async getFavorites(): Promise<Favorite[]> {
    const response = await this.apiCall('/api/favorites')
    const data = await response.json()
    return data.favorites || []
  }

  async addFavorite(courseId: string): Promise<Favorite> {
    const response = await this.apiCall('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to add favorite')
    }

    return data.favorite
  }

  async removeFavorite(courseId: string): Promise<void> {
    await this.apiCall(`/api/favorites/${courseId}`, {
      method: 'DELETE',
    })
  }

  // ============ PROGRESS ============

  async getProgress(): Promise<LessonProgress[]> {
    const response = await this.apiCall('/api/progress')
    const data = await response.json()
    return data.progress || []
  }

  async getCourseProgress(courseId: string): Promise<LessonProgress[]> {
    const response = await this.apiCall(`/api/progress/course/${courseId}`)
    const data = await response.json()
    return data.progress || []
  }

  async updateProgress(lessonId: string, progress: Partial<LessonProgress>): Promise<void> {
    await this.apiCall(`/api/progress/${lessonId}`, {
      method: 'PUT',
      body: JSON.stringify(progress),
    })
  }

  // ============ QUIZZES ============

  async getQuizAttempts(): Promise<QuizAttempt[]> {
    const response = await this.apiCall('/api/quizzes/attempts')
    const data = await response.json()
    return data.attempts || []
  }

  async submitQuizAttempt(attempt: QuizAttempt): Promise<void> {
    await this.apiCall('/api/quizzes/attempts', {
      method: 'POST',
      body: JSON.stringify(attempt),
    })
  }

  // ============ STATS ============

  async getStats(): Promise<{ stats: UserStats | null; recentActivity: any[] }> {
    const response = await this.apiCall('/api/stats')
    const data = await response.json()
    return {
      stats: data.stats || null,
      recentActivity: data.recentActivity || [],
    }
  }

  // ============ SYNC ============

  async pullSync(since?: number): Promise<SyncData> {
    const params = since ? `?since=${since}` : ''
    const response = await this.apiCall(`/api/sync/pull${params}`)
    const data = await response.json()
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LAST_SYNC_KEY, data.syncTime.toString())
    }

    return data.data
  }

  async pushSync(data: Partial<SyncData>): Promise<void> {
    if (this.syncInProgress) {
      console.log('Sync already in progress, skipping...')
      return
    }

    this.syncInProgress = true

    try {
      await this.apiCall('/api/sync/push', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          deviceId: this.deviceId,
          platform: 'web',
        }),
      })

      if (typeof window !== 'undefined') {
        localStorage.setItem(LAST_SYNC_KEY, Date.now().toString())
      }
    } finally {
      this.syncInProgress = false
    }
  }

  async fullSync(): Promise<SyncData> {
    if (!this.token) {
      throw new Error('Not authenticated')
    }

    const lastSync = typeof window !== 'undefined' 
      ? parseInt(localStorage.getItem(LAST_SYNC_KEY) || '0') 
      : 0

    return await this.pullSync(lastSync || undefined)
  }

  getLastSyncTime(): number {
    if (typeof window === 'undefined') return 0
    return parseInt(localStorage.getItem(LAST_SYNC_KEY) || '0')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }
}

// Export singleton instance
export const syncService = new SyncService()

// Export class for testing
export { SyncService }
