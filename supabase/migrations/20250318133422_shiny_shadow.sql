/*
  # Create todos table and setup security

  1. New Tables
    - `todos`
      - `id` (bigint, primary key)
      - `created_at` (timestamp with time zone)
      - `title` (text)
      - `is_complete` (boolean)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `todos` table
    - Add policies for authenticated users to:
      - Read their own todos
      - Create new todos
      - Update their own todos
      - Delete their own todos
*/

CREATE TABLE IF NOT EXISTS todos (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  is_complete boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own todos
CREATE POLICY "Users can read own todos"
  ON todos
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create todos
CREATE POLICY "Users can create todos"
  ON todos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own todos
CREATE POLICY "Users can update own todos"
  ON todos
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own todos
CREATE POLICY "Users can delete own todos"
  ON todos
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);