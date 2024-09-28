
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
  name VARCHAR(100) NOT NULL,                         -- Name of the background (e.g., Soldier, Noble)
  description TEXT,                                   -- General description of the background
  source_id UUID REFERENCES sources(id),              -- Links to the source where the background is from (can be null for homebrew)
  skill_proficiencies JSONB,                          -- A list of skill proficiencies (JSON format, e.g., ["Athletics", "History"])
  tool_proficiencies JSONB,                           -- A list of tool proficiencies (JSON format, e.g., ["Smith's Tools"])
  language_options JSONB,                             -- Optional: additional languages a character can learn from the background
  equipment JSONB,                                    -- List of starting equipment provided by the background
  customizations JSONB,                               -- Stores any customizations like replacing skills, tools, or features
  personality_traits JSONB,                           -- List of suggested personality traits
  ideals JSONB,                                       -- Suggested ideals (e.g., Honor, Freedom)
  bonds JSONB,                                        -- Suggested bonds (e.g., loyalty to a mentor or group)
  flaws JSONB,                                        -- Suggested flaws (e.g., prone to gambling or greed)
  homebrew BOOLEAN DEFAULT FALSE,                     -- Flag to indicate if the background is homebrew
  user_id UUID REFERENCES users(id),                  -- Optional: Tracks the user who created the homebrew background
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
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
  character_name VARCHAR(100) NOT NULL,        -- Name of the character
  avatar_url VARCHAR(255),                     -- URL or path to the character's avatar or image
  sources_homebrew BOOLEAN DEFAULT FALSE,      -- Toggle for homebrew sources
  dice_rolling BOOLEAN DEFAULT FALSE,          -- Toggle for digital dice rolling
  optional_class_features BOOLEAN DEFAULT FALSE, -- Toggle for optional class features
  customize_origin BOOLEAN DEFAULT FALSE,      -- Toggle for customizing origin
  advancement_type VARCHAR(20) CHECK (advancement_type IN ('XP', 'Milestone')), -- XP or Milestone advancement
  hit_point_type VARCHAR(20) CHECK (hit_point_type IN ('Fixed', 'Roll')), -- Fixed HP or Roll HP
  prerequisites_feats BOOLEAN DEFAULT TRUE,    -- Toggle for using feat prerequisites
  prerequisites_multiclass BOOLEAN DEFAULT TRUE, -- Toggle for using multiclass prerequisites
  show_level_scaled_spells BOOLEAN DEFAULT FALSE, -- Toggle for displaying level-scaled spells
  encumbrance_type VARCHAR(50) CHECK (encumbrance_type IN ('Standard', 'Disabled', 'Detailed')), -- Encumbrance rules
  ignore_coin_weight BOOLEAN DEFAULT FALSE,    -- Toggle to ignore coin weight
  character_privacy VARCHAR(20) CHECK (character_privacy IN ('Private', 'Public')) DEFAULT 'Private', -- Character visibility
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- We will manually update this via trigger
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
  species_id UUID REFERENCES species(id),         
  sub_species_id UUID REFERENCES sub_species(id), 
  background_id UUID REFERENCES backgrounds(id),  
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL, 
  character_preferences_id UUID REFERENCES character_preferences(id) ON DELETE CASCADE,  
  character_details_id UUID REFERENCES character_details(id) ON DELETE CASCADE, -- Reference to character_details
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
  name VARCHAR(100) NOT NULL,                      -- Class name (e.g., Barbarian, Wizard)
  description TEXT,                                -- Description of the class
  hit_die INT,                                     -- Hit die per class level (e.g., d12 for Barbarian)
  primary_ability VARCHAR(50),                     -- Primary ability score for the class (e.g., Strength for Barbarian)
  source_id UUID REFERENCES sources(id),           -- Reference to the source of the class (e.g., Player's Handbook)
  user_id UUID REFERENCES users(id),               -- Optional: Homebrew class creator
  homebrew BOOLEAN DEFAULT FALSE,                  -- Flag for homebrew classes
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
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Links to the class
  level INT NOT NULL,                                      -- The level at which the feature is unlocked
  feature_name VARCHAR(100),                               -- Name of the feature (e.g., "Rage", "Danger Sense")
  description TEXT,                                        -- Detailed description of the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE subclasses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Links to the parent class
  name VARCHAR(100) NOT NULL,                              -- Subclass name (e.g., "Berserker", "Totem Warrior")
  description TEXT,                                        -- Description of the subclass
  source_id UUID REFERENCES sources(id),                   -- Reference to the source of the subclass
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subclass_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subclass_id UUID REFERENCES subclasses(id) ON DELETE CASCADE,  -- Links to the subclass
  level INT NOT NULL,                                            -- Level at which the subclass feature is granted
  feature_name VARCHAR(100) NOT NULL,                            -- Name of the feature (e.g., "Frenzy", "Mindless Rage")
  description TEXT,                                              -- Description of the feature
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



CREATE TABLE class_features (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,  -- Links to the class
  level INT NOT NULL,                                      -- The level at which the feature is unlocked
  feature_name VARCHAR(100),                               -- Name of the feature (e.g., "Rage", "Danger Sense")
  description TEXT,                                        -- Detailed description of the feature
  rages INT,                                               -- Optional: Tracks how many times Rage can be used
  rage_damage INT,                                         -- Optional: Rage damage increase
  weapon_mastery INT,                                      -- Optional: Weapon mastery bonus
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subclass_features (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subclass_id UUID REFERENCES subclasses(id) ON DELETE CASCADE, -- Links to the subclass
  level INT NOT NULL,                                           -- The level at which the subclass feature is unlocked
  feature_name VARCHAR(100),                                    -- Name of the feature (e.g., "Frenzy", "Mindless Rage")
  description TEXT,                                             -- Detailed description of the feature
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,   -- Links to the character (one-to-many relationship)
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,          -- Links to the class
  subclass_id UUID REFERENCES subclasses(id),                      -- Optional: Links to the subclass (if applicable)
  level INT NOT NULL,                                               -- The character's level in this class
  hit_points_at_level INT,                                          -- Hit points gained at the given level
  spellcasting_ability VARCHAR(50),                                 -- Optional: The spellcasting ability for the class (if applicable)
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
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  hair VARCHAR(100),                             -- Textbox for hair description (e.g., color, style)
  skin VARCHAR(100),                             -- Textbox for skin tone/complexion
  eyes VARCHAR(100),                             -- Textbox for eye color/description
  height VARCHAR(50),                            -- Textbox for height (e.g., "6 feet", "180 cm")
  weight VARCHAR(50),                            -- Textbox for weight (e.g., "150 lbs", "68 kg")
  age INT,                                       -- Integer for age
  gender VARCHAR(50),                            -- Textbox for gender identity
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE personal_characteristics (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  personality_trait_id UUID REFERENCES personality_traits(id) ON DELETE CASCADE,  -- Links to a personality trait
  ideal_id UUID REFERENCES ideals(id) ON DELETE CASCADE,  -- Links to an ideal
  bond_id UUID REFERENCES bonds(id) ON DELETE CASCADE,  -- Links to a bond
  flaw_id UUID REFERENCES flaws(id) ON DELETE CASCADE,  -- Links to a flaw
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE personality_traits (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested traits
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom traits
  description TEXT NOT NULL,                      -- The actual personality trait description
  suggested BOOLEAN DEFAULT FALSE,                -- Flag to indicate if this is a suggested trait from the background
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE ideals (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested ideals
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom ideals
  description TEXT NOT NULL,                      -- The ideal description
  suggested BOOLEAN DEFAULT FALSE,                -- Flag to indicate if this is a suggested ideal
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE bonds (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested bonds
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom bonds
  description TEXT NOT NULL,                      -- The bond description
  suggested BOOLEAN DEFAULT FALSE,                -- Flag to indicate if this is a suggested bond
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE flaws (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested flaws
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom flaws
  description TEXT NOT NULL,                      -- The flaw description
  suggested BOOLEAN DEFAULT FALSE,                -- Flag to indicate if this is a suggested flaw
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE character_notes (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,  -- Links to organizations
  ally_id UUID REFERENCES allies(id) ON DELETE CASCADE,  -- Links to allies
  enemy_id UUID REFERENCES enemies(id) ON DELETE CASCADE,  -- Links to enemies
  backstory_id UUID REFERENCES backstory(id) ON DELETE CASCADE,  -- Links to backstory
  other_note_id UUID REFERENCES other_notes(id) ON DELETE CASCADE,  -- Links to other notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE organizations (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested organizations
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom organizations
  name VARCHAR(100) NOT NULL,                    -- Name of the organization
  description TEXT,                              -- Description of the organization
  suggested BOOLEAN DEFAULT FALSE,               -- Flag to indicate if it's a premade organization
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE allies (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested allies
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom allies
  name VARCHAR(100) NOT NULL,                    -- Name of the ally
  description TEXT,                              -- Description of the ally and relationship to the character
  suggested BOOLEAN DEFAULT FALSE,               -- Flag to indicate if it's a premade ally
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE enemies (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_id UUID REFERENCES backgrounds(id),  -- Links to the background for suggested enemies
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom enemies
  name VARCHAR(100) NOT NULL,                    -- Name of the enemy
  description TEXT,                              -- Description of the enemy and relationship to the character
  suggested BOOLEAN DEFAULT FALSE,               -- Flag to indicate if it's a premade enemy
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE backstory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom backstory
  description TEXT,                              -- Backstory of the character
  suggested BOOLEAN DEFAULT FALSE,               -- Flag to indicate if it's a premade backstory (if any exist)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

CREATE TABLE other_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Links to the character for custom notes
  description TEXT,                              -- Any other important notes or details for the character
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
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
  name VARCHAR(100) NOT NULL,                      -- Name of the feat
  description TEXT,                                -- Description of the feat
  prerequisites JSONB,                             -- Prerequisites for the feat
  source_id UUID REFERENCES sources(id),           -- Source reference
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character_feats (
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  feat_id UUID REFERENCES feats(id) ON DELETE CASCADE,
  acquired_at_level INT,                           -- Level at which the feat was acquired
  PRIMARY KEY (character_id, feat_id)
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