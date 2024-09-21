-- supabase/migrations/20240319000000_add_columns_to_messages.sql

-- Add user_id column
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Add timestamp column
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Rename content column to message if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'messages' AND column_name = 'message') THEN
        ALTER TABLE messages RENAME COLUMN content TO message;
    END IF;
END $$;

-- Add index on user_id for faster queries
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);

-- Add index on timestamp for faster sorting
CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);