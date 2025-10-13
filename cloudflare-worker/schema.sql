-- ICT Revision Hub Sync Database Schema
-- D1 Database for Cloudflare Workers

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    last_sync_at INTEGER,
    is_active INTEGER DEFAULT 1,
    CHECK (is_active IN (0, 1))
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- User profiles (extended information)
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id TEXT PRIMARY KEY,
    bio TEXT,
    grade_level TEXT,
    school TEXT,
    target_exam TEXT,
    language TEXT DEFAULT 'en',
    theme TEXT DEFAULT 'light',
    notifications_enabled INTEGER DEFAULT 1,
    study_reminder_time TEXT,
    timezone TEXT,
    metadata TEXT, -- JSON string for additional data
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (notifications_enabled IN (0, 1))
);

-- Favorite courses
CREATE TABLE IF NOT EXISTS favorites (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, course_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_course ON favorites(course_id);

-- Lesson progress
CREATE TABLE IF NOT EXISTS lesson_progress (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    is_completed INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    time_spent_seconds INTEGER DEFAULT 0,
    last_accessed_at INTEGER,
    completed_at INTEGER,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, lesson_id),
    CHECK (is_completed IN (0, 1)),
    CHECK (progress_percentage >= 0 AND progress_percentage <= 100)
);

CREATE INDEX idx_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_progress_course ON lesson_progress(course_id);
CREATE INDEX idx_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_progress_completed ON lesson_progress(user_id, is_completed);

-- Quiz attempts and scores
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    quiz_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    time_taken_seconds INTEGER,
    attempt_number INTEGER DEFAULT 1,
    answers_json TEXT, -- JSON string of user answers
    created_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CHECK (score >= 0 AND score <= 100)
);

CREATE INDEX idx_quiz_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_lesson ON quiz_attempts(lesson_id);
CREATE INDEX idx_quiz_created ON quiz_attempts(created_at);

-- Study sessions (tracking)
CREATE TABLE IF NOT EXISTS study_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    course_id TEXT,
    lesson_id TEXT,
    start_time INTEGER NOT NULL,
    end_time INTEGER,
    duration_seconds INTEGER,
    platform TEXT, -- 'web' or 'android'
    device_info TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sessions_user ON study_sessions(user_id);
CREATE INDEX idx_sessions_time ON study_sessions(start_time);

-- Achievements and badges
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    achievement_type TEXT NOT NULL,
    achievement_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    points INTEGER DEFAULT 0,
    unlocked_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, achievement_key)
);

CREATE INDEX idx_achievements_user ON achievements(user_id);
CREATE INDEX idx_achievements_unlocked ON achievements(unlocked_at);

-- User statistics (summary)
CREATE TABLE IF NOT EXISTS user_stats (
    user_id TEXT PRIMARY KEY,
    total_courses_started INTEGER DEFAULT 0,
    total_lessons_completed INTEGER DEFAULT 0,
    total_quizzes_taken INTEGER DEFAULT 0,
    total_study_time_seconds INTEGER DEFAULT 0,
    average_quiz_score REAL DEFAULT 0.0,
    current_streak_days INTEGER DEFAULT 0,
    longest_streak_days INTEGER DEFAULT 0,
    last_activity_date INTEGER,
    total_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Sync log (for conflict resolution)
CREATE TABLE IF NOT EXISTS sync_log (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    entity_type TEXT NOT NULL, -- 'favorite', 'progress', 'quiz', etc.
    entity_id TEXT NOT NULL,
    action TEXT NOT NULL, -- 'create', 'update', 'delete'
    data_json TEXT, -- JSON snapshot of data
    device_id TEXT,
    platform TEXT,
    synced_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sync_user ON sync_log(user_id);
CREATE INDEX idx_sync_time ON sync_log(synced_at);
CREATE INDEX idx_sync_entity ON sync_log(entity_type, entity_id);

-- Device registrations (for push notifications, etc.)
CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    device_id TEXT UNIQUE NOT NULL,
    device_name TEXT,
    device_type TEXT, -- 'android', 'ios', 'web'
    os_version TEXT,
    app_version TEXT,
    push_token TEXT,
    last_active_at INTEGER NOT NULL,
    registered_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_devices_user ON devices(user_id);
CREATE INDEX idx_devices_device ON devices(device_id);

-- Notes and bookmarks
CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    content TEXT NOT NULL,
    highlight_text TEXT,
    position INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_notes_user ON notes(user_id);
CREATE INDEX idx_notes_lesson ON notes(lesson_id);

-- Settings sync
CREATE TABLE IF NOT EXISTS user_settings (
    user_id TEXT PRIMARY KEY,
    settings_json TEXT NOT NULL, -- JSON string of all settings
    updated_at INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create views for common queries

-- User progress summary view
CREATE VIEW IF NOT EXISTS v_user_progress_summary AS
SELECT 
    u.id as user_id,
    u.username,
    COUNT(DISTINCT lp.course_id) as courses_in_progress,
    COUNT(DISTINCT CASE WHEN lp.is_completed = 1 THEN lp.lesson_id END) as lessons_completed,
    CAST(AVG(CASE WHEN lp.is_completed = 1 THEN 100 ELSE lp.progress_percentage END) as INTEGER) as avg_progress,
    SUM(lp.time_spent_seconds) as total_time_spent,
    MAX(lp.last_accessed_at) as last_activity
FROM users u
LEFT JOIN lesson_progress lp ON u.id = lp.user_id
WHERE u.is_active = 1
GROUP BY u.id, u.username;

-- Recent activity view
CREATE VIEW IF NOT EXISTS v_recent_activity AS
SELECT 
    'lesson' as activity_type,
    lp.user_id,
    lp.lesson_id as entity_id,
    lp.last_accessed_at as activity_time
FROM lesson_progress lp
WHERE lp.last_accessed_at IS NOT NULL
UNION ALL
SELECT 
    'quiz' as activity_type,
    qa.user_id,
    qa.quiz_id as entity_id,
    qa.created_at as activity_time
FROM quiz_attempts qa
UNION ALL
SELECT 
    'favorite' as activity_type,
    f.user_id,
    f.course_id as entity_id,
    f.created_at as activity_time
FROM favorites f
ORDER BY activity_time DESC;

-- Indexes for performance
CREATE INDEX idx_progress_user_completed ON lesson_progress(user_id, is_completed, completed_at);
CREATE INDEX idx_quiz_user_score ON quiz_attempts(user_id, score);
