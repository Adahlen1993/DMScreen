
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



CREATE TABLE species (
  id SERIAL PRIMARY KEY,
  species_name VARCHAR(50) NOT NULL,         -- Species name
  description TEXT,                          -- Description of the species
  ability_bonuses JSONB,                     -- Ability bonuses for species without sub-species
  size VARCHAR(20),                          -- Size category
  speed INTEGER                              -- Speed in feet
);



CREATE TABLE sub_species (
  id SERIAL PRIMARY KEY,
  species_id INTEGER REFERENCES species(id) ON DELETE CASCADE,  -- Links to main species
  sub_species_name VARCHAR(50) NOT NULL,                        -- Sub-species name
  description TEXT,                                             -- Description of the sub-species
  ability_bonuses JSONB,                                        -- Ability bonuses specific to the sub-species
  size VARCHAR(20),                                             -- Size category (e.g., Medium, Small)
  speed INTEGER                                                 -- Speed in feet (e.g., 30)
);

CREATE TABLE sub_species_ability_adjustments (
  id SERIAL PRIMARY KEY,
  sub_species_id INTEGER REFERENCES sub_species(id) ON DELETE CASCADE,  -- Link to the sub-species
  adjustment_type VARCHAR(20) NOT NULL,  -- Type of adjustment: 'static', 'custom'
  ability_bonuses JSONB,                 -- Static bonuses (only used if adjustment_type is 'static')
  flexible_option_1 BOOLEAN DEFAULT FALSE,  -- +1 to three different stats
  flexible_option_2 BOOLEAN DEFAULT FALSE   -- +2 to one stat and +1 to another
);

CREATE TABLE traits (
  id SERIAL PRIMARY KEY,
  trait_name VARCHAR(100) NOT NULL,      -- Name of the trait (e.g., Darkvision, Fey Ancestry)
  description TEXT                       -- Description of the trait
);

CREATE TABLE sub_species_traits (
  sub_species_id INTEGER REFERENCES sub_species(id) ON DELETE CASCADE,
  trait_id INTEGER REFERENCES traits(id) ON DELETE CASCADE,
  PRIMARY KEY (sub_species_id, trait_id)  -- Composite primary key to ensure uniqueness
);





