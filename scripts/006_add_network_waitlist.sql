-- Create waitlist table for The Network
CREATE TABLE IF NOT EXISTS public.network_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  school TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.network_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (join waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON public.network_waitlist
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to view their own waitlist entry
CREATE POLICY "Users can view own waitlist entry"
  ON public.network_waitlist
  FOR SELECT
  TO public
  USING (auth.email() = email);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_network_waitlist_email ON public.network_waitlist(email);
