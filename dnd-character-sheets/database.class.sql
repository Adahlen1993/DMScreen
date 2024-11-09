CREATE TABLE classes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- Replaced UUID with BIGINT
  class_name VARCHAR(100) NOT NULL,
  description TEXT,
  primary_ability VARCHAR(50),  -- Main ability for the class
  multiclass_requirements JSONB,  -- Store multiclass prerequisites (e.g., minimum ability scores)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE feature_labels (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- Primary key for this table
  label_name VARCHAR(50) NOT NULL UNIQUE,  -- Name of the feature type (e.g., proficiency, skill, ability, spell)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Record creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Last updated timestamp
);


CREATE TABLE class_features (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,  -- Primary key for this table
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,  -- Reference to the class
  feature_name VARCHAR(100) NOT NULL,  -- Name of the feature
  description TEXT,  -- Description of the feature
  level INT,  -- Level at which the feature is unlocked
  modifier JSONB,  -- JSONB field to store any modifiers or additional information
  has_choices BOOLEAN DEFAULT FALSE,  -- Indicates if the feature has selectable options
  allow_duplicates BOOLEAN DEFAULT FALSE,
  choices JSONB,  -- JSONB field to store selectable options if applicable
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE subclasses (
   id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,  -- Link to the main class
  subclass_name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subclass_features (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  subclass_id BIGINT REFERENCES subclasses(id) ON DELETE CASCADE,  -- Link to the subclass
  level INT NOT NULL,  -- Level at which the feature is unlocked
  feature_name VARCHAR(100) NOT NULL,
  description TEXT,
  modifier JSONB,  -- JSON field to store any modifiers applied by the feature
  has_choices BOOLEAN DEFAULT FALSE,  -- Indicates if the feature has selectable options
  choices JSONB,  -- JSONB field to store selectable options if applicable
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proficiency_types (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL UNIQUE,  -- e.g., 'Armor', 'Weapon', 'Tool', 'Skill'
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE proficiencies (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    proficiency_type_id BIGINT REFERENCES proficiency_types(id),  -- Reference to proficiency_types
    description TEXT,
    source_id BIGINT,  -- Reference to where the proficiency came from (e.g., specific book or custom content)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE class_proficiency (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,
    proficiency_id BIGINT REFERENCES proficiencies(id) ON DELETE CASCADE,
    is_given BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);



CREATE TABLE character_proficiencies (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
    proficiency_id BIGINT REFERENCES proficiencies(id) ON DELETE CASCADE,
    source VARCHAR(100),  -- Could specify where the proficiency was obtained (class, background, etc.)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE character_class_features (
    character_id UUID NOT NULL,
    class_id BIGINT NOT NULL,
    feature_id BIGINT NOT NULL,
    level INT NOT NULL,
    PRIMARY KEY (character_id, feature_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (character_id) REFERENCES characters(id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (feature_id) REFERENCES class_features(id)
);



CREATE OR REPLACE FUNCTION check_total_level() RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COALESCE(SUM(level), 0) FROM character_classes WHERE character_id = NEW.character_id
  ) > 20 THEN
    RAISE EXCEPTION 'Total level for character cannot exceed 20';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER total_level_check_trigger
  BEFORE INSERT OR UPDATE ON character_classes
  FOR EACH ROW
  EXECUTE FUNCTION check_total_level();

  CREATE TABLE character_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,  -- Link to the character
  class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE,  -- Link to the class
  level INT NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 20),  -- Level for this class (1-20 per class, default is 1)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



------------------------------------------------------BARBARIAN---------------------------------------------------------

INSERT INTO classes (
  id, name, description, hit_die, primary_ability, source_id, user_id, homebrew, created_at, updated_at
) VALUES (
  gen_random_uuid(),  -- Generate a random UUID for the class ID
  'Barbarian',        -- Class name
  'For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.', 
  12,                 -- Hit die is d12 for Barbarian
  'Strength',         -- Primary ability is Strength for Barbarian
  'source-id-here',   -- Replace with the actual source ID for Player\'s Handbook or appropriate source
  NULL,               -- Set user_id to NULL if this is not a homebrew class
  FALSE,              -- Not a homebrew class
  CURRENT_TIMESTAMP,  -- Timestamp for creation
  CURRENT_TIMESTAMP   -- Timestamp for last update
);

------------------------------------------------------Barbarian Subclasses---------------------------------------------------------

INSERT INTO subclasses (id, class_id, name, description, source_id, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Ancestral Guardian', 'Description for Ancestral Guardian subclass.', '58d125f0-49be-4076-b974-00775579f100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Battlerager', 'Description for Battlerager subclass.', '440a4037-e009-4b57-8f27-31c585d4fd56', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Beast', 'Description for Beast subclass.', '14d6a386-4a09-4690-a695-c64547ba3025', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Berserker', 'Description for Berserker subclass.', '9fa49698-1251-42c4-96e2-45a8d787906c', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Giant', 'Description for Giant subclass.', 'f65bd10a-891e-4e99-bc6c-8bb9f1c847c3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Storm Herald', 'Description for Storm Herald subclass.', '58d125f0-49be-4076-b974-00775579f100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Totem Warrior', 'Description for Totem Warrior subclass.', '9fa49698-1251-42c4-96e2-45a8d787906c', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Wild Magic', 'Description for Wild Magic subclass.', '14d6a386-4a09-4690-a695-c64547ba3025', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'Zealot', 'Description for Zealot subclass.', '58d125f0-49be-4076-b974-00775579f100', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (class_id, feature_name, description, requires_choice, options, number_of_options, allow_duplicates)
VALUES (1, 'Proficiencies', 'Proficiencies include: \nArmor: Light armor, Medium armor, Shields\nWeapons: Simple weapons, Martial weapons\nTools: None\nSaving Throws: Strength, Constitution\nSkills: Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival.', true, 
  '[
    {"value": "animal_handling", "label": "Animal Handling"},
    {"value": "athletics", "label": "Athletics"},
    {"value": "intimidation", "label": "Intimidation"},
    {"value": "nature", "label": "Nature"},
    {"value": "perception", "label": "Perception"},
    {"value": "survival", "label": "Survival"}
  ]', 
  2, false);

