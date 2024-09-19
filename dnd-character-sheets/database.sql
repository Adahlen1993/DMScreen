
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,  -- Store the user's email
  first_name VARCHAR(100),  -- Store the user's first name
  last_name VARCHAR(100),   -- Store the user's last name
  date_of_birth DATE,  -- Store the user's date of birth
  password VARCHAR(255) NOT NULL,  -- Hashed password
  is_admin BOOLEAN DEFAULT FALSE,  -- Whether the user is an admin
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  character_name VARCHAR(100) NOT NULL,
  class VARCHAR(100),
  species VARCHAR(100),
  character_details TEXT,
  background TEXT,
  notes TEXT,
  inventory JSONB,
  spells JSONB,
  feats JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  class_name VARCHAR(50) NOT NULL,
  hit_dice VARCHAR(10) NOT NULL,
  primary_ability VARCHAR(50),
  saving_throws VARCHAR(100),
  spellcasting BOOLEAN DEFAULT false,
  description TEXT
);

CREATE TABLE character_details (
  id SERIAL PRIMARY KEY,
  character_id INTEGER REFERENCES characters(id) ON DELETE CASCADE,
  alignment VARCHAR(50),     -- e.g., Lawful Good, Chaotic Evil
  faith VARCHAR(100),        -- Religious belief or deity
  lifestyle VARCHAR(100),    -- Standard of living (e.g., modest, aristocratic)
);
