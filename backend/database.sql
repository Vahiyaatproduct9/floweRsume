-- Create pgcrypto extension for UUID generation if not already available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum for transaction status
CREATE TYPE transactionstatus AS ENUM ('pending', 'paid', 'failed');

-- Users table (synced from Clerk webhook)
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id      TEXT UNIQUE NOT NULL,
  email         TEXT NOT NULL,
  credits       INT DEFAULT 3,         -- free tier starts here
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Resumes table (every generation saved automatically)
CREATE TABLE resumes (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
  job_description     TEXT NOT NULL,
  original_text       TEXT,                  -- raw parsed text from their uploaded PDF
  generated_json      JSONB NOT NULL,        -- structured resume sections from AI
  ats_score_before    INT,                   -- optional but impressive
  ats_score_after     INT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID REFERENCES users(id) ON DELETE CASCADE,
  razorpay_order_id     TEXT UNIQUE NOT NULL,
  razorpay_payment_id   TEXT,
  credits_purchased     INT NOT NULL,          -- e.g., 20
  amount_paise          INT NOT NULL,          -- e.g., 9900
  status                transactionstatus DEFAULT 'pending',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);
