-- Update event details with correct information
-- Update event title to "Bridging Students and Industry"
UPDATE public.event_config 
SET value = 'Bridging Students and Industry - BCH Virtual Unconference' 
WHERE key = 'event_title';

-- Update event date (please specify the correct date)
UPDATE public.event_config 
SET value = '2024-12-15' 
WHERE key = 'event_date';

-- Update event location (please specify the correct location/format)
UPDATE public.event_config 
SET value = 'Virtual Event' 
WHERE key = 'event_location';
