
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

-- First, create the alignment_type table with a serial id for efficiency
CREATE TABLE alignment_type (
  id SERIAL PRIMARY KEY,  -- Serial ID for alignment type
  type_name VARCHAR(50) NOT NULL UNIQUE,  -- Alignment type (e.g., "Lawful", "Neutral", "Chaotic")
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modify the alignment table to reference alignment_type
CREATE TABLE alignment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Keeping UUID for alignment table
  alignment_type_id INT REFERENCES alignment_type(id) ON DELETE SET NULL,  -- Reference to the alignment_type table
  alignment_name VARCHAR(50) NOT NULL UNIQUE,  -- Specific alignment (e.g., "Lawful Good")
  description TEXT,  -- Description of the alignment
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- First, create the lifestyle_type table
CREATE TABLE lifestyle_type (
id SERIAL PRIMARY KEY,  
  type_name VARCHAR(50) NOT NULL UNIQUE,  -- Lifestyle type (e.g., "Aristocratic", "Poor", "Common")
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modify the lifestyle table to reference lifestyle_type
CREATE TABLE lifestyle (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lifestyle_type_id INT REFERENCES lifestyle_type(id) ON DELETE SET NULL,
  lifestyle_name VARCHAR(50) NOT NULL UNIQUE,  -- Specific lifestyle (e.g., "Poor")
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

CREATE TABLE personal_characteristics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personality_traits_id UUID REFERENCES personality_traits(id) ON DELETE SET NULL,  -- Link to personality traits
  ideals_id UUID REFERENCES ideals(id) ON DELETE SET NULL,  -- Link to ideals
  bonds_id UUID REFERENCES bonds(id) ON DELETE SET NULL,  -- Link to bonds
  flaws_id UUID REFERENCES flaws(id) ON DELETE SET NULL,  -- Link to flaws
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

CREATE TABLE species_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name VARCHAR(100) NOT NULL,  -- Name of the feature (e.g., "Darkvision")
  description TEXT,                    -- Description of the feature
  modifier JSONB,                      -- Any modifiers provided by the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subspecies_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_name VARCHAR(100) NOT NULL,  -- Name of the feature (e.g., "Darkvision")
  description TEXT,                    -- Description of the feature
  modifier JSONB,                      -- Any modifiers provided by the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE spells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spell_name VARCHAR(100) NOT NULL,  -- Name of the spell (e.g., "Fireball")
  description TEXT NOT NULL,  -- Description of the spell’s effect
  level INT NOT NULL,  -- Spell level (e.g., 3 for "Fireball")
  school VARCHAR(50) NOT NULL,  -- Spell school (e.g., "Evocation", "Necromancy")
  casting_time VARCHAR(50) NOT NULL,  -- Casting time (e.g., "1 action")
  range VARCHAR(50) NOT NULL,  -- Spell range (e.g., "150 feet")
  duration VARCHAR(50) NOT NULL,  -- Duration of the spell (e.g., "Instantaneous")
  components JSONB,  -- Spell components (e.g., {"V": true, "S": true, "M": "A pinch of sulfur"})
  concentration BOOLEAN DEFAULT FALSE,  -- Whether the spell requires concentration
  ritual BOOLEAN DEFAULT FALSE,  -- Whether the spell can be cast as a ritual
  modifiers JSONB,  -- Modifiers the spell grants (e.g., {"wisdom": +2, "strength": -1})
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the spell is homebrew
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subspecies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subspecies_name VARCHAR(100) NOT NULL,  -- Name of the subspecies (e.g., "High Elf", "Wood Elf")
  description TEXT,                      -- Description of the subspecies
  subspecies_features_id UUID REFERENCES species_features(id) ON DELETE CASCADE,  -- Link to features specific to the subspecies
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_name VARCHAR(100) NOT NULL,  -- Name of the species (e.g., "Elf", "Dwarf")
  description TEXT,                    -- Description of the species
  species_features_id UUID REFERENCES species_features(id) ON DELETE CASCADE,  -- Link to species features
  subspecies_id UUID REFERENCES subspecies(id) ON DELETE SET NULL,  -- Optional link to subspecies (can be null)
  spells_id UUID REFERENCES spells(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- Replaced UUID with BIGINT
  class_name VARCHAR(100) NOT NULL,
  description TEXT,
  primary_ability VARCHAR(50),  -- Main ability for the class
  multiclass_requirements JSONB,  -- Store multiclass prerequisites (e.g., minimum ability scores)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE class_features (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- Primary key for this table
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,  -- Reference to the class
  feature_name VARCHAR(100) NOT NULL,  -- Name of the feature
  description TEXT,  -- Description of the feature
  level INT,  -- Level at which the feature is unlocked
  modifier JSONB,  -- JSONB field to store any modifiers or additional information
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

CREATE TABLE abilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  strength INT NOT NULL DEFAULT 10,   -- Base strength score
  dexterity INT NOT NULL DEFAULT 10,  -- Base dexterity score
  constitution INT NOT NULL DEFAULT 10,  -- Base constitution score
  intelligence INT NOT NULL DEFAULT 10,  -- Base intelligence score
  wisdom INT NOT NULL DEFAULT 10,     -- Base wisdom score
  charisma INT NOT NULL DEFAULT 10,   -- Base charisma score
  strength_modifier INT GENERATED ALWAYS AS (FLOOR((strength - 10) / 2)) STORED,  -- Automatically calculate modifier
  dexterity_modifier INT GENERATED ALWAYS AS (FLOOR((dexterity - 10) / 2)) STORED,
  constitution_modifier INT GENERATED ALWAYS AS (FLOOR((constitution - 10) / 2)) STORED,
  intelligence_modifier INT GENERATED ALWAYS AS (FLOOR((intelligence - 10) / 2)) STORED,
  wisdom_modifier INT GENERATED ALWAYS AS (FLOOR((wisdom - 10) / 2)) STORED,
  charisma_modifier INT GENERATED ALWAYS AS (FLOOR((charisma - 10) / 2)) STORED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name VARCHAR(100) NOT NULL,  -- Name of the skill (e.g., "Perception")
  ability_id UUID REFERENCES abilities(id) ON DELETE CASCADE,  -- Link to the relevant ability score (e.g., Wisdom)
  description TEXT,  -- Description of the skill
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feat_name VARCHAR(100) NOT NULL,  -- Name of the feat (e.g., "Actor")
  description TEXT,  -- Description of the feat
  ability_score_improvement JSONB,  -- Store ability score increases (e.g., {"charisma": 1})
  prerequisites JSONB,  -- Store prerequisites (e.g., {"charisma": 13, "level": 4})
  source VARCHAR(100),  -- Source material (e.g., "Player's Handbook")
  benefit TEXT,  -- Additional benefits provided by the feat
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  CREATE TABLE character_feats (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the character
--   feat_id UUID REFERENCES feats(id) ON DELETE CASCADE,  -- Link to the feat
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE rarity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rarity_name VARCHAR(50) NOT NULL UNIQUE,  -- Name of the rarity (e.g., "Common", "Ancient")
  description TEXT,  -- Optional description of what defines the rarity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_name VARCHAR(100) NOT NULL,  -- Name of the property (e.g., "Finesse", "Versatile")
  description TEXT,  -- Description of what the property does
  modifier JSONB,  -- JSON field to store any modifiers applied by the property (e.g., damage modifiers, AC bonuses, etc.)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE weapon_type (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_name VARCHAR(100) NOT NULL,  -- Type of weapon (e.g., "Martial", "Simple")
  description TEXT,  -- Description of the weapon type
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE armor_type (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_name VARCHAR(100) NOT NULL,  -- Type of armor (e.g., "Leather", "Studded Leather")
  description TEXT,  -- Description of the armor type
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE armor_weight (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weight_class VARCHAR(50) NOT NULL,  -- Weight class (e.g., "Light", "Medium", "Heavy")
  description TEXT,  -- Description of the weight class
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE weapons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  weapon_name VARCHAR(100) NOT NULL,  -- Name of the weapon (e.g., "Longsword")
  damage VARCHAR(10) NOT NULL,  -- Primary damage (e.g., "1d8")
  damage_type VARCHAR(50) NOT NULL,  -- Damage type (e.g., "Slashing")
  weight DECIMAL(5, 2),  -- Weight of the weapon
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Common", "Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  weapon_type_id UUID REFERENCES weapon_type(id) ON DELETE CASCADE,  -- Link to weapon type (e.g., "Martial", "Simple")
   spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for rings that grant spells)
  is_magic BOOLEAN DEFAULT FALSE,  -- Whether the weapon is a magic item
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the weapon requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the weapon is a homebrew item
  description TEXT,  -- General description of the weapon
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE armor (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  armor_name VARCHAR(100) NOT NULL,  -- Name of the armor (e.g., "Chain Mail")
  ac INT NOT NULL,  -- Armor class (e.g., "16")
  minimum_strength INT,  -- Minimum strength requirement
  stealth_disadvantage BOOLEAN DEFAULT FALSE,  -- Stealth disadvantage
  weight DECIMAL(5, 2),  -- Weight of the armor
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Common", "Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
   spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for rings that grant spells)
  armor_type_id UUID REFERENCES armor_type(id) ON DELETE CASCADE,  -- Link to armor type (e.g., "Leather", "Studded Leather")
  armor_weight_id UUID REFERENCES armor_weight(id) ON DELETE CASCADE,  -- Link to armor weight (e.g., "Light", "Medium", "Heavy")
  is_magic BOOLEAN DEFAULT FALSE,  -- Whether the armor is a magic item
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the armor requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the armor is a homebrew item
  description TEXT,  -- General description of the armor
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE potions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  potion_name VARCHAR(100) NOT NULL,  -- Name of the potion (e.g., "Potion of Healing")
  description TEXT NOT NULL,  -- General description of the potion's effect (replacing "effect" for consistency)
  duration VARCHAR(50),  -- Duration of the effect (if applicable)
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Common", "Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for potions that mimic spells)
  is_magic BOOLEAN DEFAULT FALSE,  -- Whether the potion is magical
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the potion is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ring_name VARCHAR(100) NOT NULL,  -- Name of the ring (e.g., "Ring of Protection")
  description TEXT NOT NULL,  -- Description of the ring’s effect (e.g., "Grants +1 to AC and saving throws")
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Uncommon", "Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for rings that grant spells)
  is_magic BOOLEAN DEFAULT FALSE,  -- Whether the ring is magical
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the ring requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the ring is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rod_name VARCHAR(100) NOT NULL,  -- Name of the rod (e.g., "Rod of Absorption")
  description TEXT NOT NULL,  -- Description of the rod’s effect (e.g., "Can absorb spells and store them")
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Rare", "Very Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for rods that grant spells)
  is_magic BOOLEAN DEFAULT FALSE,  -- Whether the rod is magical
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the rod requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the rod is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scrolls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scroll_name VARCHAR(100) NOT NULL,  -- Name of the scroll (e.g., "Scroll of Fireball")
  description TEXT NOT NULL,  -- Description of the scroll’s effect
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Common", "Uncommon")
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (for scrolls containing spells)
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  is_magic BOOLEAN DEFAULT TRUE,  -- Scrolls are inherently magical
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the scroll is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wand_name VARCHAR(100) NOT NULL,  -- Name of the wand (e.g., "Wand of Magic Missiles")
  description TEXT NOT NULL,  -- Description of the wand’s effect
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Uncommon", "Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for wands that cast spells)
  is_magic BOOLEAN DEFAULT TRUE,  -- Wands are inherently magical
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the wand requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the wand is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wondrous_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name VARCHAR(100) NOT NULL,  -- Name of the wondrous item (e.g., "Cloak of Invisibility")
  description TEXT NOT NULL,  -- Description of the item's effect
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (e.g., "Rare", "Very Rare")
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for items that grant spells)
  is_magic BOOLEAN DEFAULT TRUE,  -- Wondrous items are inherently magical
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the item requires attunement
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the item is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE other_gear (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gear_name VARCHAR(100) NOT NULL,  -- Name of the gear (e.g., "Tent", "Rope")
  description TEXT NOT NULL,  -- Description of the gear’s function
  weight DECIMAL(5, 2),  -- Weight of the gear (if applicable)
  rarity_id UUID REFERENCES rarity(id) ON DELETE CASCADE,  -- Link to rarity (optional)
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional, for gear that grants spells)
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the gear is a homebrew item
  requires_attunement BOOLEAN DEFAULT FALSE,  -- Whether the item requires attunement
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE currency (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platinum DECIMAL(10, 2) DEFAULT 0,  -- Amount of platinum
  gold DECIMAL(10, 2) DEFAULT 0,  -- Amount of gold
  silver DECIMAL(10, 2) DEFAULT 0,  -- Amount of silver
  copper DECIMAL(10, 2) DEFAULT 0,  -- Amount of copper
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the currency is homebrew (optional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE other_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name VARCHAR(100) NOT NULL,  -- Name of the item (e.g., "Lich's Skull")
  description TEXT,  -- Nullable description of the item
  weight DECIMAL(5, 2),  -- Weight of the item (if applicable)
  rarity_id UUID REFERENCES rarity(id) ON DELETE SET NULL,  -- Link to rarity (optional)
  properties_id UUID REFERENCES item_properties(id) ON DELETE SET NULL,  -- Link to item properties (optional)
  spell_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Link to the spell table (optional)
  homebrew BOOLEAN DEFAULT FALSE,  -- Whether the item is a homebrew item
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  armor_id UUID REFERENCES armor(id) ON DELETE SET NULL,  -- Link to the armor table, can be NULL
  weapon_id UUID REFERENCES weapons(id) ON DELETE SET NULL,  -- Link to the weapons table, can be NULL
  potion_id UUID REFERENCES potions(id) ON DELETE SET NULL,  -- Link to the potions table, can be NULL
  ring_id UUID REFERENCES rings(id) ON DELETE SET NULL,  -- Link to the rings table, can be NULL
  rod_id UUID REFERENCES rods(id) ON DELETE SET NULL,  -- Link to the rods table, can be NULL
  scroll_id UUID REFERENCES scrolls(id) ON DELETE SET NULL,  -- Link to the scrolls table, can be NULL
  wand_id UUID REFERENCES wands(id) ON DELETE SET NULL,  -- Link to the wands table, can be NULL
  wondrous_item_id UUID REFERENCES wondrous_items(id) ON DELETE SET NULL,  -- Link to wondrous items, can be NULL
  other_gear_id UUID REFERENCES other_gear(id) ON DELETE SET NULL,  -- Link to other gear, can be NULL
  currency_id UUID REFERENCES currency(id) ON DELETE SET NULL,  -- Link to the currency table, can be NULL
  other_items_id UUID REFERENCES other_items(id) ON DELETE SET NULL,  -- Link to other items, can be NULL
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE character_skills (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,  -- Link to the skill
--   proficiency BOOLEAN DEFAULT FALSE,  -- Is the character proficient in this skill
--   expertise BOOLEAN DEFAULT FALSE,  -- Does the character have expertise in this skill
--   proficiency_bonus INT GENERATED ALWAYS AS (
--     CASE 
--       WHEN level >= 17 THEN 6
--       WHEN level >= 13 THEN 5
--       WHEN level >= 9 THEN 4
--       WHEN level >= 5 THEN 3
--       ELSE 2
--     END
--   ) STORED,  -- Proficiency bonus based on character level
--   skill_bonus INT GENERATED ALWAYS AS (
--     CASE 
--       WHEN expertise THEN (ability_modifier + (proficiency_bonus * 2))
--       WHEN proficiency THEN (ability_modifier + proficiency_bonus)
--       ELSE ability_modifier
--     END
--   ) STORED,  -- Calculated skill bonus
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Auto-generate UUID for the character
  preferences_id UUID REFERENCES character_preferences(id) ON DELETE CASCADE,  -- Link to character preferences
  class_id UUID REFERENCES character_classes(id) ON DELETE SET NULL,  -- Link to the character's class selection
  -- background_id UUID REFERENCES backgrounds(id) ON DELETE SET NULL,  -- Nullable until the user selects a background
  -- species_id UUID REFERENCES species(id) ON DELETE SET NULL,  -- Nullable until the user selects a species
  -- abilities_id UUID REFERENCES abilities(id) ON DELETE SET NULL,  -- Nullable until abilities are defined
  -- equipment_id UUID REFERENCES equipment(id) ON DELETE SET NULL,  -- Nullable until equipment is selected
  -- feats_id UUID REFERENCES feats(id) ON DELETE SET NULL,  -- Nullable until feats are selected
  -- spells_id UUID REFERENCES spells(id) ON DELETE SET NULL,  -- Nullable until spells are selected
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically set upon creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Will be updated as the user makes changes
);

ALTER TABLE characters
ADD COLUMN class_id BIGINT REFERENCES character_classes(id) ON DELETE SET NULL;




CREATE TABLE character_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the character
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,  -- Link to the class
  level INT NOT NULL CHECK (level >= 1 AND level <= 20),  -- Level for this class (1-20 per class)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create the user_characters join table
CREATE TABLE user_characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique ID for each record
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Link to the users table
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the characters table
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When the character was created for the user
  last_played TIMESTAMP  -- Optional field to track the last time the character was used
);


-- CREATE TABLE character_proficiencies (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   character_id UUID REFERENCES characters(id),     -- Reference to the character
--   proficiency_id UUID REFERENCES proficiencies(id),-- Reference to the selected proficiency
--   acquired_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- When the proficiency was acquired
-- );

-- CREATE TABLE ability_score_improvements (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the character
--   ability_id UUID REFERENCES abilities(id) ON DELETE CASCADE,  -- Link to the specific ability (Strength, Dexterity, etc.)
--   improvement_value INT NOT NULL,  -- Value of the improvement (usually +1 or +2)
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
