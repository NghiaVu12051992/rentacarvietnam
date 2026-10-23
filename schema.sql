-- Schema for Cloudflare D1 Database: rentacarvietnam-db
-- Table: quotes (Stores incoming car & bus rental inquiry leads)

CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pax TEXT NOT NULL,
  days TEXT,
  destination TEXT NOT NULL,
  travel_date TEXT,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'quoted', 'booked', 'cancelled'
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for quick sorting by newest inquiries
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);
