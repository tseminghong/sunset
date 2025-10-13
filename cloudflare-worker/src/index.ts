/**
 * ICT Revision Hub Sync API
 * Cloudflare Worker for multi-platform user data synchronization
 * 
 * Features:
 * - User authentication with JWT
 * - Favorite courses sync
 * - Lesson progress tracking
 * - Quiz attempts and scores
 * - Study sessions
 * - Achievements
 * - Cross-platform sync (Web + Android)
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import { z } from 'zod'

// Types
type Bindings = {
  DB: D1Database
  SESSIONS?: KVNamespace
  JWT_SECRET: string
}

type Variables = {
  user: {
    id: string
    username: string
  }
}

// Initialize Hono app
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// CORS middleware
app.use('/*', cors({
  origin: '*', // In production, specify exact origins
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 600,
}))

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: Date.now(),
    version: '1.0.0' 
  })
})

// Utility functions
function generateId(): string {
  return crypto.randomUUID()
}

function hashPassword(password: string): Promise<string> {
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
    .then(buf => Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join(''))
}

async function generateJWT(userId: string, username: string, secret: string): Promise<string> {
  const { SignJWT } = await import('jose')
  const encoder = new TextEncoder()
  const secretKey = encoder.encode(secret)
  
  return new SignJWT({ sub: userId, username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secretKey)
}

async function verifyJWT(token: string, secret: string): Promise<{ sub: string, username: string } | null> {
  try {
    const { jwtVerify } = await import('jose')
    const encoder = new TextEncoder()
    const secretKey = encoder.encode(secret)
    
    const { payload } = await jwtVerify(token, secretKey)
    return payload as { sub: string, username: string }
  } catch {
    return null
  }
}

// Auth middleware
app.use('/api/*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  
  const token = authHeader.substring(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  
  if (!payload) {
    return c.json({ error: 'Invalid token' }, 401)
  }
  
  c.set('user', { id: payload.sub, username: payload.username })
  await next()
})

// ============ AUTH ENDPOINTS ============

// Register
app.post('/auth/register', async (c) => {
  try {
    const body = await c.req.json()
    const { username, password, email } = body
    
    if (!username || !password) {
      return c.json({ error: 'Username and password required' }, 400)
    }
    
    if (password.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters' }, 400)
    }
    
    // Check if user exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM users WHERE username = ? OR email = ?'
    ).bind(username, email || null).first()
    
    if (existing) {
      return c.json({ error: 'Username or email already exists' }, 409)
    }
    
    // Create user
    const userId = generateId()
    const passwordHash = await hashPassword(password)
    const now = Date.now()
    
    await c.env.DB.prepare(
      'INSERT INTO users (id, username, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(userId, username, email || null, passwordHash, now, now).run()
    
    // Create default profile
    await c.env.DB.prepare(
      'INSERT INTO user_profiles (user_id, language, theme) VALUES (?, ?, ?)'
    ).bind(userId, 'en', 'light').run()
    
    // Create default stats
    await c.env.DB.prepare(
      'INSERT INTO user_stats (user_id, updated_at) VALUES (?, ?)'
    ).bind(userId, now).run()
    
    return c.json({ 
      success: true, 
      userId,
      message: 'User registered successfully' 
    }, 201)
  } catch (error) {
    console.error('Register error:', error)
    return c.json({ error: 'Registration failed' }, 500)
  }
})

// Login
app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    const { username, password } = body
    
    if (!username || !password) {
      return c.json({ error: 'Username and password required' }, 400)
    }
    
    const passwordHash = await hashPassword(password)
    
    const user = await c.env.DB.prepare(
      'SELECT id, username, email, display_name FROM users WHERE username = ? AND password_hash = ? AND is_active = 1'
    ).bind(username, passwordHash).first()
    
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401)
    }
    
    // Update last sync
    await c.env.DB.prepare(
      'UPDATE users SET last_sync_at = ? WHERE id = ?'
    ).bind(Date.now(), user.id).run()
    
    // Generate JWT
    const token = await generateJWT(user.id as string, user.username as string, c.env.JWT_SECRET)
    
    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.display_name
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return c.json({ error: 'Login failed' }, 500)
  }
})

// Get current user
app.get('/api/me', async (c) => {
  const { id } = c.get('user')
  
  const user = await c.env.DB.prepare(`
    SELECT u.id, u.username, u.email, u.display_name, u.avatar_url, u.created_at,
           up.bio, up.grade_level, up.school, up.language, up.theme
    FROM users u
    LEFT JOIN user_profiles up ON u.id = up.user_id
    WHERE u.id = ?
  `).bind(id).first()
  
  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  
  return c.json({ user })
})

// ============ FAVORITES ENDPOINTS ============

// Get favorites
app.get('/api/favorites', async (c) => {
  const { id } = c.get('user')
  
  const favorites = await c.env.DB.prepare(
    'SELECT id, course_id, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC'
  ).bind(id).all()
  
  return c.json({ favorites: favorites.results })
})

// Add favorite
app.post('/api/favorites', async (c) => {
  const { id } = c.get('user')
  const { courseId } = await c.req.json()
  
  if (!courseId) {
    return c.json({ error: 'Course ID required' }, 400)
  }
  
  const favoriteId = generateId()
  const now = Date.now()
  
  try {
    await c.env.DB.prepare(
      'INSERT INTO favorites (id, user_id, course_id, created_at) VALUES (?, ?, ?, ?)'
    ).bind(favoriteId, id, courseId, now).run()
    
    return c.json({ 
      success: true, 
      favorite: { id: favoriteId, courseId, createdAt: now } 
    }, 201)
  } catch (error) {
    if (error instanceof Error && error.message.includes('UNIQUE')) {
      return c.json({ error: 'Already favorited' }, 409)
    }
    throw error
  }
})

// Remove favorite
app.delete('/api/favorites/:courseId', async (c) => {
  const { id } = c.get('user')
  const courseId = c.req.param('courseId')
  
  await c.env.DB.prepare(
    'DELETE FROM favorites WHERE user_id = ? AND course_id = ?'
  ).bind(id, courseId).run()
  
  return c.json({ success: true })
})

// ============ LESSON PROGRESS ENDPOINTS ============

// Get all progress
app.get('/api/progress', async (c) => {
  const { id } = c.get('user')
  
  const progress = await c.env.DB.prepare(`
    SELECT id, course_id, lesson_id, is_completed, progress_percentage, 
           time_spent_seconds, last_accessed_at, completed_at, notes
    FROM lesson_progress 
    WHERE user_id = ?
    ORDER BY last_accessed_at DESC
  `).bind(id).all()
  
  return c.json({ progress: progress.results })
})

// Get progress for a course
app.get('/api/progress/course/:courseId', async (c) => {
  const { id } = c.get('user')
  const courseId = c.req.param('courseId')
  
  const progress = await c.env.DB.prepare(
    'SELECT * FROM lesson_progress WHERE user_id = ? AND course_id = ?'
  ).bind(id, courseId).all()
  
  return c.json({ progress: progress.results })
})

// Update lesson progress
app.put('/api/progress/:lessonId', async (c) => {
  const { id } = c.get('user')
  const lessonId = c.req.param('lessonId')
  const { courseId, isCompleted, progressPercentage, timeSpentSeconds, notes } = await c.req.json()
  
  const now = Date.now()
  const progressId = generateId()
  
  // Check if progress exists
  const existing = await c.env.DB.prepare(
    'SELECT id FROM lesson_progress WHERE user_id = ? AND lesson_id = ?'
  ).bind(id, lessonId).first()
  
  if (existing) {
    // Update
    await c.env.DB.prepare(`
      UPDATE lesson_progress 
      SET is_completed = COALESCE(?, is_completed),
          progress_percentage = COALESCE(?, progress_percentage),
          time_spent_seconds = time_spent_seconds + COALESCE(?, 0),
          last_accessed_at = ?,
          completed_at = CASE WHEN ? = 1 AND is_completed = 0 THEN ? ELSE completed_at END,
          notes = COALESCE(?, notes)
      WHERE user_id = ? AND lesson_id = ?
    `).bind(
      isCompleted !== undefined ? (isCompleted ? 1 : 0) : null,
      progressPercentage,
      timeSpentSeconds || 0,
      now,
      isCompleted ? 1 : 0,
      now,
      notes,
      id,
      lessonId
    ).run()
  } else {
    // Insert
    await c.env.DB.prepare(`
      INSERT INTO lesson_progress 
      (id, user_id, course_id, lesson_id, is_completed, progress_percentage, 
       time_spent_seconds, last_accessed_at, completed_at, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      progressId,
      id,
      courseId,
      lessonId,
      isCompleted ? 1 : 0,
      progressPercentage || 0,
      timeSpentSeconds || 0,
      now,
      isCompleted ? now : null,
      notes || null
    ).run()
  }
  
  return c.json({ success: true })
})

// ============ QUIZ ATTEMPTS ENDPOINTS ============

// Get quiz attempts
app.get('/api/quizzes/attempts', async (c) => {
  const { id } = c.get('user')
  
  const attempts = await c.env.DB.prepare(`
    SELECT id, lesson_id, quiz_id, score, total_questions, correct_answers,
           time_taken_seconds, attempt_number, created_at
    FROM quiz_attempts 
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 100
  `).bind(id).all()
  
  return c.json({ attempts: attempts.results })
})

// Submit quiz attempt
app.post('/api/quizzes/attempts', async (c) => {
  const { id } = c.get('user')
  const { 
    lessonId, 
    quizId, 
    score, 
    totalQuestions, 
    correctAnswers, 
    timeTakenSeconds, 
    answers 
  } = await c.req.json()
  
  const attemptId = generateId()
  const now = Date.now()
  
  // Get attempt number
  const lastAttempt = await c.env.DB.prepare(
    'SELECT MAX(attempt_number) as max_attempt FROM quiz_attempts WHERE user_id = ? AND quiz_id = ?'
  ).bind(id, quizId).first()
  
  const attemptNumber = (lastAttempt?.max_attempt as number || 0) + 1
  
  await c.env.DB.prepare(`
    INSERT INTO quiz_attempts 
    (id, user_id, lesson_id, quiz_id, score, total_questions, correct_answers,
     time_taken_seconds, attempt_number, answers_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    attemptId,
    id,
    lessonId,
    quizId,
    score,
    totalQuestions,
    correctAnswers,
    timeTakenSeconds,
    attemptNumber,
    JSON.stringify(answers || []),
    now
  ).run()
  
  return c.json({ 
    success: true, 
    attempt: { id: attemptId, attemptNumber } 
  }, 201)
})

// ============ STATS ENDPOINTS ============

// Get user statistics
app.get('/api/stats', async (c) => {
  const { id } = c.get('user')
  
  const stats = await c.env.DB.prepare(`
    SELECT * FROM user_stats WHERE user_id = ?
  `).bind(id).first()
  
  // Get recent activity
  const recentActivity = await c.env.DB.prepare(`
    SELECT * FROM v_recent_activity WHERE user_id = ? LIMIT 10
  `).bind(id).all()
  
  return c.json({ 
    stats,
    recentActivity: recentActivity.results 
  })
})

// ============ SYNC ENDPOINTS ============

// Full sync - get all user data
app.get('/api/sync/pull', async (c) => {
  const { id } = c.get('user')
  const since = c.req.query('since') // Unix timestamp
  
  // Get all data since last sync
  let favorites, progress, quizzes
  
  if (since) {
    const sinceTime = parseInt(since)
    favorites = await c.env.DB.prepare(
      'SELECT * FROM favorites WHERE user_id = ? AND created_at > ?'
    ).bind(id, sinceTime).all()
    
    progress = await c.env.DB.prepare(
      'SELECT * FROM lesson_progress WHERE user_id = ? AND last_accessed_at > ?'
    ).bind(id, sinceTime).all()
    
    quizzes = await c.env.DB.prepare(
      'SELECT * FROM quiz_attempts WHERE user_id = ? AND created_at > ?'
    ).bind(id, sinceTime).all()
  } else {
    favorites = await c.env.DB.prepare(
      'SELECT * FROM favorites WHERE user_id = ?'
    ).bind(id).all()
    
    progress = await c.env.DB.prepare(
      'SELECT * FROM lesson_progress WHERE user_id = ?'
    ).bind(id).all()
    
    quizzes = await c.env.DB.prepare(
      'SELECT * FROM quiz_attempts WHERE user_id = ?'
    ).bind(id).all()
  }
  
  const profile = await c.env.DB.prepare(
    'SELECT * FROM user_profiles WHERE user_id = ?'
  ).bind(id).first()
  
  const stats = await c.env.DB.prepare(
    'SELECT * FROM user_stats WHERE user_id = ?'
  ).bind(id).first()
  
  return c.json({
    syncTime: Date.now(),
    data: {
      favorites: favorites.results || [],
      progress: progress.results || [],
      quizzes: quizzes.results || [],
      profile: profile || null,
      stats: stats || null
    }
  })
})

// Push sync data
app.post('/api/sync/push', async (c) => {
  const { id } = c.get('user')
  const { favorites, progress, quizzes, deviceId, platform } = await c.req.json()
  
  const now = Date.now()
  
  // Batch insert/update operations
  // This is a simplified version - production should handle conflicts
  
  // Update favorites
  if (favorites && Array.isArray(favorites)) {
    for (const fav of favorites) {
      try {
        await c.env.DB.prepare(
          'INSERT OR IGNORE INTO favorites (id, user_id, course_id, created_at) VALUES (?, ?, ?, ?)'
        ).bind(fav.id || generateId(), id, fav.courseId, fav.createdAt || now).run()
      } catch (e) {
        console.error('Error syncing favorite:', e)
      }
    }
  }
  
  // Update progress
  if (progress && Array.isArray(progress)) {
    for (const p of progress) {
      try {
        await c.env.DB.prepare(`
          INSERT INTO lesson_progress 
          (id, user_id, course_id, lesson_id, is_completed, progress_percentage, 
           time_spent_seconds, last_accessed_at, completed_at, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id, lesson_id) DO UPDATE SET
            is_completed = excluded.is_completed,
            progress_percentage = excluded.progress_percentage,
            time_spent_seconds = excluded.time_spent_seconds,
            last_accessed_at = excluded.last_accessed_at,
            completed_at = excluded.completed_at,
            notes = excluded.notes
        `).bind(
          p.id || generateId(),
          id,
          p.courseId,
          p.lessonId,
          p.isCompleted ? 1 : 0,
          p.progressPercentage || 0,
          p.timeSpentSeconds || 0,
          p.lastAccessedAt || now,
          p.completedAt || null,
          p.notes || null
        ).run()
      } catch (e) {
        console.error('Error syncing progress:', e)
      }
    }
  }
  
  // Log sync
  await c.env.DB.prepare(`
    INSERT INTO sync_log (id, user_id, entity_type, entity_id, action, device_id, platform, synced_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(generateId(), id, 'full_sync', 'batch', 'push', deviceId || 'unknown', platform || 'unknown', now).run()
  
  return c.json({ 
    success: true,
    syncTime: now 
  })
})

// Export app
export default app
