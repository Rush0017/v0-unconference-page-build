-- Update event time to 10 AM - 1 PM ET
UPDATE event_config 
SET value = '10 AM - 1 PM ET' 
WHERE key = 'event_time';
