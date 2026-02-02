-- TaskFlow AI Analytics Database Setup
-- Run SQL in your Supabase SQL Editor

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority INTEGER NOT NULL DEFAULT 1 CHECK (priority BETWEEN 1 AND 3),
  deadline TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON public.tasks(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (authentication will be added later)
CREATE POLICY "Allow all operations for development" 
  ON public.tasks
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Add some sample data for testing
INSERT INTO public.tasks (user_id, title, description, priority, deadline, status)
VALUES 
  ('default-user', 'Sample Task 1', 'This is a sample task to test the application', 2, NOW() + INTERVAL '7 days', 'pending'),
  ('default-user', 'Sample Task 2', 'Another sample task with high priority', 3, NOW() + INTERVAL '3 days', 'in_progress'),
  ('default-user', 'Sample Task 3', 'Completed sample task', 1, NOW() - INTERVAL '1 day', 'completed')
ON CONFLICT DO NOTHING;
