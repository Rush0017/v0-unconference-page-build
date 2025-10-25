-- Update all event dates from 2024 to 2025

-- Update main event date
UPDATE public.event_config 
SET value = '2025-11-21' 
WHERE key = 'event_date';

-- Update Campus Connect launch date
UPDATE public.event_config 
SET value = '2025-11-14' 
WHERE key = 'campus_connect_launch_date';
