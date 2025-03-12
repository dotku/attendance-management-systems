/*
  # Leave Management System Schema

  1. New Tables
    - `leave_records`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `personnel_type` (enum: officer, soldier, civilian)
      - `start_date` (date)
      - `end_date` (date)
      - `reason` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `leave_records` table
    - Add policies for:
      - Users can read all records (for statistics and search)
      - Users can only create/update their own records
*/

-- Create enum type for personnel categories
CREATE TYPE personnel_type AS ENUM ('officer', 'soldier', 'civilian');

-- Create leave records table
CREATE TABLE IF NOT EXISTS leave_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  personnel_type personnel_type NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  reason text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  -- Add constraint to ensure end_date is not before start_date
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Enable RLS
ALTER TABLE leave_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read leave records"
  ON leave_records
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own records"
  ON leave_records
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own records"
  ON leave_records
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leave_records_user_id ON leave_records(user_id);
CREATE INDEX IF NOT EXISTS idx_leave_records_name ON leave_records(name);
CREATE INDEX IF NOT EXISTS idx_leave_records_personnel_type ON leave_records(personnel_type);
CREATE INDEX IF NOT EXISTS idx_leave_records_date_range ON leave_records(start_date, end_date);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_leave_records_updated_at
  BEFORE UPDATE ON leave_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();