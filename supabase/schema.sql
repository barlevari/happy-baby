-- ============================================================
-- Happy Baby – Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up your database
-- ============================================================

-- 1. Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('moms', 'student', 'admin')),
  id_number TEXT,
  lmp_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'blocked')),
  subscription_status TEXT DEFAULT 'none' CHECK (subscription_status IN ('none', 'active', 'cancelled', 'expired')),
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Video progress tracking
CREATE TABLE IF NOT EXISTS video_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  video_id INTEGER NOT NULL,
  watched_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_watched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, video_id)
);

-- 3. Test tracking (pregnancy tests/checkups)
CREATE TABLE IF NOT EXISTS test_tracking (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  test_id INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'skipped')),
  date DATE,
  notes TEXT,
  UNIQUE(user_id, test_id)
);

-- 4. Health metrics
CREATE TABLE IF NOT EXISTS health_metrics (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  weight DECIMAL(5,2),
  bp_systolic INTEGER,
  bp_diastolic INTEGER,
  blood_sugar INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Chat history
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (safe re-run)
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;
DROP POLICY IF EXISTS "Users manage own video progress" ON video_progress;
DROP POLICY IF EXISTS "Users manage own test tracking" ON test_tracking;
DROP POLICY IF EXISTS "Users manage own health metrics" ON health_metrics;
DROP POLICY IF EXISTS "Users manage own chat messages" ON chat_messages;

-- Profiles: users can create/read/update their own profile.
-- NOTE: Admin policies that used EXISTS(SELECT FROM profiles WHERE role='admin')
-- were removed because they caused recursive RLS evaluation, making all profile
-- queries hang or fail. Admin operations on other users' profiles should use
-- a service-role key (server-side) or Supabase dashboard instead.
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Video progress: users can manage their own
CREATE POLICY "Users manage own video progress" ON video_progress
  FOR ALL USING (auth.uid() = user_id);

-- Test tracking: users can manage their own
CREATE POLICY "Users manage own test tracking" ON test_tracking
  FOR ALL USING (auth.uid() = user_id);

-- Health metrics: users can manage their own
CREATE POLICY "Users manage own health metrics" ON health_metrics
  FOR ALL USING (auth.uid() = user_id);

-- Chat messages: users can manage their own
CREATE POLICY "Users manage own chat messages" ON chat_messages
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Profile creation on signup
-- ============================================================
-- NOTE: The database trigger approach was removed because it caused
-- "Database error saving new user" failures during signUp.
-- Profile creation is now handled in the client code (AuthContext.jsx)
-- via a manual upsert after supabase.auth.signUp() succeeds.
--
-- If you need to restore the trigger in the future, uncomment below:
--
-- CREATE OR REPLACE FUNCTION handle_new_user()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   INSERT INTO profiles (id, name, email, role, id_number, lmp_date, status)
--   VALUES (
--     NEW.id,
--     COALESCE(NEW.raw_user_meta_data->>'name', ''),
--     NEW.email,
--     COALESCE(NEW.raw_user_meta_data->>'role', 'moms'),
--     COALESCE(NEW.raw_user_meta_data->>'id_number', ''),
--     CASE
--       WHEN NEW.raw_user_meta_data->>'lmp_date' IS NOT NULL
--       THEN (NEW.raw_user_meta_data->>'lmp_date')::DATE
--       ELSE NULL
--     END,
--     CASE
--       WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'moms') = 'admin' THEN 'approved'
--       ELSE 'pending'
--     END
--   );
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;
--
-- CREATE OR REPLACE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON profiles(status);
CREATE INDEX IF NOT EXISTS idx_video_progress_user ON video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_health_metrics_user_date ON health_metrics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON chat_messages(user_id, created_at);
