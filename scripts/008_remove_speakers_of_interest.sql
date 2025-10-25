-- Remove speakers_of_interest column from rsvps table
ALTER TABLE rsvps DROP COLUMN IF EXISTS speakers_of_interest;
