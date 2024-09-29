
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Auto-generate UUID for the ID
  username VARCHAR(50) UNIQUE NOT NULL,       
  email VARCHAR(100) UNIQUE NOT NULL,         
  password_hash VARCHAR(255) NOT NULL,        
  first_name VARCHAR(50),                     
  last_name VARCHAR(50),                      
  date_of_birth DATE,                         
  profile_picture VARCHAR(255),               
  bio TEXT,                                   
  verified BOOLEAN DEFAULT FALSE,             
  status VARCHAR(20) CHECK (status IN ('active', 'banned', 'pending_verification')) DEFAULT 'active', 
  is_admin BOOLEAN DEFAULT FALSE,             -- Admin status (false by default)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- This will be manually updated via trigger
  last_login TIMESTAMP,                       
  CONSTRAINT unique_email_username UNIQUE (email, username)
);





CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Link to the user who created the character
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,  -- Link to the character's class
  background_id UUID REFERENCES backgrounds(id) ON DELETE SET NULL,  -- Link to the character's background
  species_id UUID REFERENCES species(id) ON DELETE SET NULL,  -- Link to the character's species
  abilities_id UUID REFERENCES abilities(id) ON DELETE CASCADE,  -- Link to the character's abilities
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,  -- Link to the character's equipment
  feats_id UUID REFERENCES feats(id) ON DELETE CASCADE,  -- Link to the character's feats
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE backgrounds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_id UUID REFERENCES origins(id) ON DELETE CASCADE,  -- Link to premade origin
  character_details_id UUID REFERENCES character_details(id) ON DELETE CASCADE,  -- Link to character details
  physical_characteristics_id UUID REFERENCES physical_characteristics(id) ON DELETE CASCADE,  -- Link to physical characteristics
  personal_characteristics_id UUID REFERENCES personal_characteristics(id) ON DELETE CASCADE,  -- Link to personal characteristics
  character_notes_id UUID REFERENCES character_notes(id) ON DELETE CASCADE,  -- Link to character notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE origins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_name VARCHAR(100) NOT NULL,   -- Name of the origin (e.g., "Noble", "Soldier")
  description TEXT,                    -- Description of the origin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE origin_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  origin_id UUID REFERENCES origins(id) ON DELETE CASCADE,  -- Link to the origins table
  feature_name VARCHAR(100) NOT NULL,   -- Name of the feature (e.g., "Skill Proficiency", "Tool Proficiency")
  description TEXT,                     -- Description of the feature
  modifier JSONB,  -- Store any specific modifiers the feature grants (e.g., skill proficiency, equipment, languages)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alignment_name VARCHAR(50) NOT NULL UNIQUE,  -- Alignment name (e.g., "Lawful Good")
  description TEXT,  -- Description of the alignment
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE lifestyle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lifestyle_name VARCHAR(50) NOT NULL UNIQUE,  -- Lifestyle name (e.g., "Poor")
  description TEXT,  -- Description of the lifestyle
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alignment_id UUID REFERENCES alignment(id) ON DELETE SET NULL,  -- Link to the alignment table
  faith TEXT,  -- Faith as free text
  lifestyle_id UUID REFERENCES lifestyle(id) ON DELETE SET NULL,  -- Link to the lifestyle table
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                      -- Name of the campaign
  description TEXT,                                -- Description of the campaign
  dungeon_master_id UUID REFERENCES users(id),     -- Links to the DM (user) running the campaign
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the characters table
  character_name VARCHAR(100) NOT NULL,  -- Character name
  avatar_url VARCHAR(255),               -- Image or avatar for the character

  -- Source settings
  allow_sources BOOLEAN DEFAULT TRUE,   -- Master switch for allowing sources
  homebrew BOOLEAN DEFAULT FALSE,       -- Switch for allowing homebrew
  expanded_rules BOOLEAN DEFAULT FALSE, -- Switch for expanded rules
  legacy_rules BOOLEAN DEFAULT FALSE,   -- Switch for legacy 2014 rules

  -- Partnered content switches
  critical_role BOOLEAN DEFAULT FALSE,
  drakkenheim BOOLEAN DEFAULT FALSE,
  humblewood BOOLEAN DEFAULT FALSE,
  grim_hollow BOOLEAN DEFAULT FALSE,
  kobold_press BOOLEAN DEFAULT FALSE,
  mcdm BOOLEAN DEFAULT FALSE,
  minecraft BOOLEAN DEFAULT FALSE,
  rick_and_morty BOOLEAN DEFAULT FALSE,

  -- Dice rolling
  dice_rolling BOOLEAN DEFAULT FALSE,   -- Enable digital dice rolling
  
  -- Optional features
  optional_class_features BOOLEAN DEFAULT FALSE,
  customize_your_origin BOOLEAN DEFAULT FALSE,

  -- Advancement type (Milestone/XP)
  advancement_type VARCHAR(50) CHECK (advancement_type IN ('Milestone', 'XP')) DEFAULT 'Milestone',

  -- Hit point type (Fixed/Manual)
  hit_point_type VARCHAR(50) CHECK (hit_point_type IN ('Fixed', 'Manual')) DEFAULT 'Fixed',

  -- Use prerequisites
  feats_prerequisites BOOLEAN DEFAULT TRUE,
  multiclass_prerequisites BOOLEAN DEFAULT TRUE,

  -- Spell scaling
  show_level_scaled_spells BOOLEAN DEFAULT TRUE,

  -- Encumbrance settings
  encumbrance_type VARCHAR(50) CHECK (encumbrance_type IN ('No Encumbrance', 'Use Encumbrance', 'Variant Encumbrance')) DEFAULT 'No Encumbrance',

  -- Coin weight
  ignore_coin_weight BOOLEAN DEFAULT TRUE,

  -- Character privacy
  character_privacy VARCHAR(50) CHECK (character_privacy IN ('Campaign Only', 'Private', 'Public')) DEFAULT 'Campaign Only',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE character_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alignment VARCHAR(50),                          -- Dropdown for alignment (e.g., Lawful Good, Chaotic Neutral)
  faith TEXT,                                     -- Textbox for faith or deity
  lifestyle VARCHAR(50),                          -- Dropdown for lifestyle (e.g., Aristocratic, Poor, Common)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  
  background_id UUID REFERENCES backgrounds(id) ON DELETE SET NULL,  -- Link to the backgrounds table
  class_id UUID REFERENCES classes(id),   
  species_id UUID REFERENCES species(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_name VARCHAR(100) NOT NULL,
  description TEXT,
  primary_ability VARCHAR(50),  -- Main ability for the class
  multiclass_requirements JSONB,  -- Store multiclass prerequisites (e.g., minimum ability scores)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Link to the main class
  level INT NOT NULL,                                      -- Level at which the feature is unlocked
  feature_name VARCHAR(100) NOT NULL,
  description TEXT,
  modifier JSONB,  -- JSON field to store any modifiers applied by the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subclasses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Link to the main class
  subclass_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subclass_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subclass_id UUID REFERENCES subclasses(id) ON DELETE CASCADE,  -- Link to the subclass
  level INT NOT NULL,                                            -- Level at which the feature is unlocked
  feature_name VARCHAR(100) NOT NULL,
  description TEXT,
  modifier JSONB,  -- JSON field to store any modifiers applied by the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_class_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  class_feature_id UUID REFERENCES class_features(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE,  -- Whether the feature is currently active
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);







CREATE TABLE proficiency_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,                       -- Name of the proficiency type (e.g., Armor, Skills)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proficiencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                      -- Name of the proficiency (e.g., Light Armor, Thieves' Tools)
  proficiency_type_id UUID REFERENCES proficiency_types(id),  -- Reference to the type of proficiency (e.g., Armor, Tools)
  subtype VARCHAR(100),                            -- Optional: subtype of the proficiency (e.g., Light for Armor, Artisan's Tool for Tools)
  description TEXT,                                -- Optional: Description of the proficiency
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_proficiencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id),     -- Reference to the character
  proficiency_id UUID REFERENCES proficiencies(id),-- Reference to the selected proficiency
  acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When the proficiency was acquired
);




CREATE TABLE physical_characteristics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hair VARCHAR(100),  -- Hair description (e.g., color, style)
  skin VARCHAR(100),  -- Skin description (e.g., tone, texture)
  eyes VARCHAR(100),  -- Eye color or description
  height VARCHAR(50),  -- Height (e.g., in feet or meters)
  weight VARCHAR(50),  -- Weight (e.g., in pounds or kilograms)
  age INT,  -- Age of the character
  gender VARCHAR(50),  -- Gender identity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personal_characteristics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personality_traits_id UUID REFERENCES personality_traits(id) ON DELETE SET NULL,  -- Link to personality traits
  ideals_id UUID REFERENCES ideals(id) ON DELETE SET NULL,  -- Link to ideals
  bonds_id UUID REFERENCES bonds(id) ON DELETE SET NULL,  -- Link to bonds
  flaws_id UUID REFERENCES flaws(id) ON DELETE SET NULL,  -- Link to flaws
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE personality_traits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trait_description TEXT NOT NULL,  -- Description of the personality trait
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ideals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ideal_description TEXT NOT NULL,  -- Description of the ideal
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bonds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bond_description TEXT NOT NULL,  -- Description of the bond
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE flaws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  flaw_description TEXT NOT NULL,  -- Description of the flaw
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE character_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizations_id UUID REFERENCES organizations(id) ON DELETE SET NULL,  -- Link to organizations
  allies_id UUID REFERENCES allies(id) ON DELETE SET NULL,  -- Link to allies
  enemies_id UUID REFERENCES enemies(id) ON DELETE SET NULL,  -- Link to enemies
  backstory_id UUID REFERENCES backstory(id) ON DELETE SET NULL,  -- Link to backstory
  other_id UUID REFERENCES other_notes(id) ON DELETE SET NULL,  -- Link to other notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name VARCHAR(100) NOT NULL,  -- Name of the organization
  description TEXT,  -- Description of the organization
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE allies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ally_name VARCHAR(100) NOT NULL,  -- Name of the ally
  description TEXT,  -- Description of the ally and relationship
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enemies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enemy_name VARCHAR(100) NOT NULL,  -- Name of the enemy
  description TEXT,  -- Description of the enemy and relationship
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE backstory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  backstory_description TEXT NOT NULL,  -- Description of the character's backstory
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE other_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  note TEXT,  -- Any other miscellaneous notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_name VARCHAR(100) NOT NULL,  -- Name of the species (e.g., "Elf", "Dwarf")
  description TEXT,                    -- Description of the species
  species_features_id UUID REFERENCES species_features(id) ON DELETE CASCADE,  -- Link to species features
  subspecies_id UUID REFERENCES subspecies(id) ON DELETE SET NULL,  -- Optional link to subspecies (can be null)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_id UUID REFERENCES species(id) ON DELETE CASCADE,  -- Can link to the species
  subspecies_id UUID REFERENCES subspecies(id) ON DELETE CASCADE,  -- Can link to the subspecies (optional)
  feature_name VARCHAR(100) NOT NULL,  -- Name of the feature (e.g., "Darkvision")
  description TEXT,                    -- Description of the feature
  modifier JSONB,                      -- Any modifiers provided by the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE subspecies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_id UUID REFERENCES species(id) ON DELETE CASCADE,  -- Link to the parent species
  subspecies_name VARCHAR(100) NOT NULL,  -- Name of the subspecies (e.g., "High Elf", "Wood Elf")
  description TEXT,                      -- Description of the subspecies
  subspecies_features_id UUID REFERENCES species_features(id) ON DELETE CASCADE,  -- Link to features specific to the subspecies
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
