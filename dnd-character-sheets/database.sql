
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

CREATE TABLE sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,               -- Name of the source material (e.g., "Player's Handbook")
  abbreviation VARCHAR(10),                 -- Abbreviation (e.g., "PHB")
  published_date DATE,                      -- Date of publication
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                                -- Species name (e.g., Human, Elf)
  description TEXT,                                          -- Species description
  age_description TEXT,                                      -- Species age range
  alignment_description TEXT,                                -- Typical alignment tendencies
  size VARCHAR(50),                                          -- Size category (e.g., Medium)
  speed INT,                                                 -- Base walking speed
  languages JSONB,                                           -- Languages known (e.g., ["Common", "Elvish"])
  additional_ability JSONB,                                  -- Additional abilities (e.g., {"Darkvision": "60 feet"})
  source_id UUID REFERENCES sources(id),                     -- Reference to source material
  user_id UUID REFERENCES users(id),                         -- The user who created the homebrew species
  homebrew BOOLEAN DEFAULT FALSE,                            -- Whether this species is homebrew
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sub_species (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  species_id UUID REFERENCES species(id) ON DELETE CASCADE,  -- Links to the main species
  name VARCHAR(100) NOT NULL,                                -- Sub-species name
  description TEXT,                                          -- Sub-species description
  ability_bonus JSONB,                                       -- Ability score bonuses (e.g., {"Dexterity": 2})
  traits JSONB,                                              -- Additional traits (e.g., {"Fleet of Foot": true})
  source_id UUID REFERENCES sources(id),                     -- Reference to source material
  user_id UUID REFERENCES users(id),                         -- The user who created the homebrew sub-species
  homebrew BOOLEAN DEFAULT FALSE,                            -- Whether this sub-species is homebrew
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
  alignment VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);







CREATE TABLE character_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Unique ID for each character-item association
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,  -- Links to the specific item (equipment)
  quantity INT DEFAULT 1,                                           -- Number of items (e.g., 2 daggers)
  is_equipped BOOLEAN DEFAULT FALSE,                                -- Whether the item is equipped or just in the inventory
  obtained_via VARCHAR(50) NOT NULL,                                -- How the item was obtained (e.g., "found", "purchased", "gifted")
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,                   -- Timestamp for when the item was added to the inventory
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp for updates (e.g., equipping/unequipping)
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


CREATE TABLE character_class_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  class_feature_id UUID REFERENCES class_features(id) ON DELETE CASCADE,
  active BOOLEAN DEFAULT TRUE,  -- Whether the feature is currently active
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  stat_name VARCHAR(50),   -- e.g., 'Dexterity', 'Constitution'
  stat_value INT,          -- e.g., 18 for Dexterity, 14 for Constitution
  stat_modifier INT,       -- Calculated as (stat_value - 10) / 2
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE class_progression (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Links to the class
  level INT NOT NULL,                                      -- Class level (1 through 20)
  proficiency_bonus INT,                                   -- Proficiency bonus for the level
  ability_score_improvement BOOLEAN DEFAULT FALSE,         -- Whether this level grants an ability score improvement (or feat)
  subclass_available BOOLEAN DEFAULT FALSE,                -- Whether subclass choice is available at this level
  spell_slots JSONB,                                       -- Spell slots for each spell level (e.g., {"1st": 2, "2nd": 1})
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_progression_id UUID REFERENCES class_progression(id) ON DELETE CASCADE,  -- Links to the class progression table
  resource_name VARCHAR(100) NOT NULL,                   -- Name of the resource (e.g., "Rage", "Infusion", "Ki Points", "Sorcery Points")
  resource_count INT NOT NULL,                           -- Amount of the resource available at this level
  description TEXT,                                      -- Optional: Description or explanation of the resource (e.g., "Bonus Rage Damage +2")
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  resource_name VARCHAR(100) NOT NULL,                            -- Name of the resource (e.g., "Rage", "Infusion", "Ki Points")
  resource_count INT NOT NULL,                                    -- Current amount of the resource the character has (e.g., remaining rages)
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


CREATE TABLE class_proficiencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,    -- References the class (e.g., Barbarian, Wizard)
  proficiency_id UUID REFERENCES proficiencies(id) ON DELETE CASCADE,  -- References the proficiency (e.g., Light Armor, Acrobatics)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);






CREATE TABLE character_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to characters table
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,         -- Link to classes table
  subclass_id UUID REFERENCES subclasses(id),  -- Link to subclasses table (optional)
  level INT NOT NULL DEFAULT 1,                -- Level in this specific class
  hit_points_at_level INT NOT NULL,            -- Hit points gained at this level
  spellcasting_ability VARCHAR(50),            -- Tracks the spellcasting ability (if applicable)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class_traits (
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  trait_id UUID REFERENCES traits(id) ON DELETE CASCADE,
  PRIMARY KEY (class_id, trait_id)
);

CREATE TABLE subclass_traits (
  subclass_id UUID REFERENCES subclasses(id) ON DELETE CASCADE,
  trait_id UUID REFERENCES traits(id) ON DELETE CASCADE,
  PRIMARY KEY (subclass_id, trait_id)
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






CREATE TABLE species_traits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                                -- Trait name (e.g., Darkvision)
  description TEXT,                                          -- Detailed description of the trait
  user_id UUID REFERENCES users(id),                         -- The user who created the homebrew trait
  homebrew BOOLEAN DEFAULT FALSE,                            -- Whether this trait is homebrew
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE traits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,            -- Name of the trait (e.g., Darkvision)
  description TEXT,                      -- Description of what the trait does
  trait_type VARCHAR(50) CHECK (trait_type IN ('stat_bonus', 'ability', 'spell')), -- Type of trait (bonus, spell, etc.)
  value JSONB                            -- Stores the value of the trait (e.g., +2 Dexterity or Darkvision 60ft)
);



CREATE TABLE sub_species_traits (
  sub_species_id UUID REFERENCES sub_species(id) ON DELETE CASCADE,
  trait_id UUID REFERENCES traits(id) ON DELETE CASCADE,
  PRIMARY KEY (sub_species_id, trait_id)
);


CREATE TABLE character_ability_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  ability_name VARCHAR(50) NOT NULL,                               -- Name of the ability (e.g., Strength, Dexterity)
  base_score INT DEFAULT 0,                                        -- The base score before any bonuses
  species_bonus INT DEFAULT 0,                                     -- Bonus from species (e.g., +2 for an Elf)
  ability_improvements INT DEFAULT 0,                              -- Points added via level-based improvements
  misc_bonus INT DEFAULT 0,                                        -- Miscellaneous bonuses (e.g., from magic items)
  set_score INT DEFAULT 0,                                         -- Manual set score, if a fixed value is applied
  other_modifier INT DEFAULT 0,                                    -- Any additional modifiers that don’t fall into other categories
  override_score INT DEFAULT 0,                                    -- Manual override score, if used to replace total
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                                  -- Name of the item (e.g., Longsword, Backpack)
  description TEXT,                                            -- Description of the item
  type VARCHAR(50) NOT NULL,                                   -- Type of equipment (e.g., weapon, armor, tool)
  cost_in_gold INT,                                            -- Cost of the item in gold pieces
  weight FLOAT,                                                -- Weight of the item
  properties JSONB,                                            -- Any special properties (e.g., for weapons: damage, range, etc.)
  source_id UUID REFERENCES sources(id),                       -- Source reference (e.g., Player's Handbook)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  equipment_id UUID REFERENCES equipment(id),                      -- Links to the specific equipment item
  quantity INT DEFAULT 1,                                          -- Number of items (e.g., 2 daggers)
  is_equipped BOOLEAN DEFAULT FALSE,                               -- Tracks whether the item is equipped or just in inventory
  obtained_via VARCHAR(50) NOT NULL,                               -- Tracks how the item was obtained (e.g., "starting", "purchased")
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE class_starting_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,       -- Links to the class
  equipment_options JSONB,                                      -- List of equipment options (e.g., choice between two weapons)
  alternative_starting_gold INT,                                -- The alternative amount of gold a player can choose instead
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE background_starting_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id) ON DELETE CASCADE,  -- Links to the background
  equipment_options JSONB,                                           -- List of equipment options
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_gold (
  character_id UUID PRIMARY KEY REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  starting_gold INT,                                                          -- Gold given at the start of the game
  current_gold INT,                                                           -- Current amount of gold the character has
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

CREATE TABLE spells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,                      -- Name of the spell
  description TEXT,                                -- Description of the spell
  level INT NOT NULL,                              -- Spell level
  school VARCHAR(50),                              -- School of magic (e.g., Evocation, Illusion)
  casting_time VARCHAR(50),                        -- Casting time (e.g., 1 action, 1 minute)
  range VARCHAR(50),                               -- Spell range
  components JSONB,                                -- Components required (e.g., ["V", "S", "M"])
  duration VARCHAR(50),                            -- Spell duration
  source_id UUID REFERENCES sources(id),           -- Source reference
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_spells (
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  spell_id UUID REFERENCES spells(id) ON DELETE CASCADE,
  spell_level INT,                                  -- Level the character gains access to the spell
  PRIMARY KEY (character_id, spell_id)
);

CREATE TABLE feats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feat_name VARCHAR(100) NOT NULL,
  description TEXT,
  prerequisites JSONB,  -- Stores the prerequisites (e.g., minimum ability scores, class-specific requirements)
  modifier JSONB,       -- Stores the effects of the feat (similar to class feature modifiers)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_feats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the characters table
  feat_id UUID REFERENCES feats(id) ON DELETE CASCADE,            -- Link to the feats table
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE equipment
ADD COLUMN is_magic BOOLEAN DEFAULT FALSE;

CREATE TABLE magic_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES equipment(id) ON DELETE CASCADE,
  name VARCHAR(100),                               -- Name of the magical property
  description TEXT,                                -- Description of the effect
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(50) NOT NULL,                       -- Condition name (e.g., Blinded, Stunned)
  description TEXT,                                -- Detailed description of the condition
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_saving_throws (
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  ability_name VARCHAR(50) NOT NULL,               -- Ability name (e.g., Strength, Dexterity)
  is_proficient BOOLEAN DEFAULT FALSE,             -- Whether the character is proficient in this saving throw
  PRIMARY KEY (character_id, ability_name)
);

CREATE TABLE character_languages (
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  language VARCHAR(100),                           -- Language name (e.g., Common, Elvish)
  PRIMARY KEY (character_id, language)
);

CREATE TABLE character_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- Transaction ID
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  field_changed VARCHAR(100),                      -- The field that was changed (e.g., 'character_name')
  old_value TEXT,                                  -- The old value before the change
  new_value TEXT,                                  -- The new value after the change
  updated_by UUID REFERENCES users(id),            -- Who made the change (optional, depending on your needs)
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- When the change occurred
);