/*
  # Create leads table for Lead Management System

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required, unique)
      - `phone` (text, required)
      - `leadSource` (text, required)
      - `createdAt` (timestamp with timezone, default now())

  2. Security
    - Enable RLS on `leads` table
    - Add policies for public access (since this is a demo app)

  3. Indexes
    - Add index on email for faster lookups
    - Add index on createdAt for sorting
    - Add index on leadSource for filtering
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text NOT NULL,
  leadSource text NOT NULL,
  createdAt timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo purposes)
CREATE POLICY "Allow public read access on leads"
  ON leads
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert access on leads"
  ON leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public delete access on leads"
  ON leads
  FOR DELETE
  TO public
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(createdAt);
CREATE INDEX IF NOT EXISTS idx_leads_lead_source ON leads(leadSource);
CREATE INDEX IF NOT EXISTS idx_leads_name ON leads(name);