-- Update event details to November 21, 2024 and Virtual location
UPDATE public.event_config 
SET value = '2024-11-21' 
WHERE key = 'event_date';

UPDATE public.event_config 
SET value = 'Virtual' 
WHERE key = 'event_location';

-- Update event title to reflect virtual nature
UPDATE public.event_config 
SET value = 'BCH Virtual Unconference' 
WHERE key = 'event_title';
