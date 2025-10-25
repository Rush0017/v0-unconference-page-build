-- Update event time to 12 PM - 3 PM ET and remove "Global" from title

UPDATE public.event_config 
SET value = '12 PM - 3 PM ET' 
WHERE key = 'event_time';

UPDATE public.event_config 
SET value = 'Bitcoin Students Network Summit' 
WHERE key = 'event_title';
