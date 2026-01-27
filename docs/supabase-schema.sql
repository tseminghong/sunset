-- Supabase Database Schema for HKDSE ICT Revision Hub
-- Copy and paste this SQL into your Supabase SQL Editor to set up the database

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PROFILES TABLE
-- Extends the basic auth user with school-specific info
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  class TEXT DEFAULT '',
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- ============================================================================
-- TOPIC_PROGRESS TABLE
-- Tracks which modules/topics students have completed
-- ============================================================================
CREATE TABLE IF NOT EXISTS topic_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'started' CHECK (status IN ('started', 'in-progress', 'completed')),
  progress_percentage DECIMAL(5, 2) DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic_id)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_topic_progress_user_id ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_topic_id ON topic_progress(topic_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_status ON topic_progress(status);
CREATE INDEX IF NOT EXISTS idx_topic_progress_last_accessed ON topic_progress(last_accessed DESC);

-- ============================================================================
-- QUIZ_SCORES TABLE
-- Tracks quiz attempts and scores
-- ============================================================================
CREATE TABLE IF NOT EXISTS quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  score DECIMAL(5, 2) NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken_seconds INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_quiz_scores_user_id ON quiz_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_quiz_id ON quiz_scores(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_created_at ON quiz_scores(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- PROFILES TABLE POLICIES
-- Users can only view their own profile
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Teachers and admins can view all profiles
CREATE POLICY "Teachers can view student profiles" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- TOPIC_PROGRESS TABLE POLICIES
-- Users can only view their own progress
CREATE POLICY "Users can view their own progress" ON topic_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can create their own progress" ON topic_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own progress" ON topic_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Teachers can view their students' progress
CREATE POLICY "Teachers can view student progress" ON topic_progress
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- QUIZ_SCORES TABLE POLICIES
-- Users can only view their own quiz scores
CREATE POLICY "Users can view their own quiz scores" ON quiz_scores
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own quiz scores
CREATE POLICY "Users can create quiz scores" ON quiz_scores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Teachers can view their students' quiz scores
CREATE POLICY "Teachers can view student quiz scores" ON quiz_scores
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('teacher', 'admin')
    )
  );

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMP
-- ============================================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for topic_progress table
CREATE TRIGGER update_topic_progress_updated_at
  BEFORE UPDATE ON topic_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA (OPTIONAL)
-- Uncomment to add sample data for testing
-- ============================================================================

-- Note: To use this sample data, you need to:
-- 1. Create users through Supabase Auth first
-- 2. Get their user IDs
-- 3. Update the UUIDs below with actual user IDs

/*
-- Sample topics
INSERT INTO topic_progress (user_id, topic_id, status, progress_percentage) VALUES
  ('user-uuid-here', 'javascript_basics', 'completed', 100),
  ('user-uuid-here', 'html_fundamentals', 'in-progress', 45),
  ('user-uuid-here', 'css_styling', 'started', 10),
  ('user-uuid-here', 'sql_queries', 'completed', 100),
  ('user-uuid-here', 'database_design', 'in-progress', 60);

-- Sample quiz scores
INSERT INTO quiz_scores (user_id, quiz_id, score, total_questions, time_taken_seconds) VALUES
  ('user-uuid-here', 'javascript_quiz_1', 85, 10, 300),
  ('user-uuid-here', 'javascript_quiz_2', 92, 10, 280),
  ('user-uuid-here', 'html_quiz_1', 78, 10, 400),
  ('user-uuid-here', 'sql_quiz_1', 88, 10, 350);
*/

-- ============================================================================
-- VIEW FOR USER STATISTICS (OPTIONAL)
-- ============================================================================

CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  p.id,
  p.username,
  p.class,
  COUNT(DISTINCT tp.topic_id) as total_topics,
  COUNT(DISTINCT CASE WHEN tp.status = 'completed' THEN tp.topic_id END) as completed_topics,
  COUNT(DISTINCT qs.quiz_id) as total_quiz_attempts,
  AVG(qs.score) as average_quiz_score,
  MAX(qs.created_at) as last_quiz_date
FROM profiles p
LEFT JOIN topic_progress tp ON p.id = tp.user_id
LEFT JOIN quiz_scores qs ON p.id = qs.user_id
GROUP BY p.id, p.username, p.class;

-- ============================================================================
-- SETUP INSTRUCTIONS
-- ============================================================================

/*
SETUP CHECKLIST:

1. Copy the entire SQL above (excluding this comment block)
2. Go to your Supabase project dashboard
3. Navigate to SQL Editor
4. Create a new query and paste the SQL
5. Execute the query

6. Environment Variables (.env.local):
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

7. Test the setup:
   - Create a test user through Auth
   - Verify the profile is created automatically
   - Insert test topic progress
   - Insert test quiz scores

8. Enable Email Confirmation (Optional but recommended):
   - Go to Supabase Dashboard → Authentication → Providers
   - Enable "Email" provider
   - Configure email templates as needed

9. Monitor RLS policies:
   - Test user can only access their own data
   - Test teacher role can view student data
   - Adjust policies as needed
*/
