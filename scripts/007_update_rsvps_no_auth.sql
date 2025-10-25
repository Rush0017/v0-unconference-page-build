-- Update RSVPs table to support registration without authentication
-- Add email and name fields, make user_id optional

ALTER TABLE rsvps 
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ALTER COLUMN user_id DROP NOT NULL;

-- Add unique constraint on email to prevent duplicate registrations
CREATE UNIQUE INDEX IF NOT EXISTS rsvps_email_unique ON rsvps(email);

-- Update RLS policies to allow anonymous inserts
DROP POLICY IF EXISTS "Users can insert their own RSVP" ON rsvps;
CREATE POLICY "Anyone can insert RSVP"
  ON rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow anyone to read RSVPs (for stats)
DROP POLICY IF EXISTS "Users can view their own RSVP" ON rsvps;
CREATE POLICY "Anyone can view RSVPs"
  ON rsvps FOR SELECT
  TO anon, authenticated
  USING (true);
