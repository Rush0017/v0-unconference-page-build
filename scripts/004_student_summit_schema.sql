-- Update database schema for Bitcoin Student Network Global Summit
-- Add new fields to profiles and rsvps tables

-- Add school-related fields to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS school TEXT,
ADD COLUMN IF NOT EXISTS school_year TEXT;

-- Add interest fields to rsvps
ALTER TABLE public.rsvps
ADD COLUMN IF NOT EXISTS school TEXT,
ADD COLUMN IF NOT EXISTS school_year TEXT,
ADD COLUMN IF NOT EXISTS topics_of_interest TEXT,
ADD COLUMN IF NOT EXISTS speakers_of_interest TEXT;

-- Update event configuration for the summit
UPDATE public.event_config SET value = 'Bitcoin Student Network Global Summit' WHERE key = 'event_title';
UPDATE public.event_config SET value = '2024-11-21' WHERE key = 'event_date';
UPDATE public.event_config SET value = 'Virtual' WHERE key = 'event_location';
UPDATE public.event_config SET value = 'true' WHERE key = 'rsvp_enabled';

-- Add new config keys for the summit
INSERT INTO public.event_config (key, value) VALUES
  ('event_time', '11:00 AM - 3:00 PM ET'),
  ('event_tagline', 'Connecting GenZ to Industry'),
  ('campus_connect_enabled', 'true'),
  ('campus_connect_status', 'coming_soon'),
  ('campus_connect_launch_date', '2024-12-01')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Create view for school statistics
CREATE OR REPLACE VIEW public.school_stats AS
SELECT 
  COUNT(DISTINCT school) as total_schools,
  COUNT(DISTINCT CASE WHEN status = 'attending' THEN user_id END) as total_attendees,
  COUNT(DISTINCT school) FILTER (WHERE school IS NOT NULL) as schools_registered
FROM public.rsvps
WHERE school IS NOT NULL AND school != '';
