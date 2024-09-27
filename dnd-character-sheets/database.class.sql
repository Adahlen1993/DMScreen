INSERT INTO classes (
  id, name, description, hit_die, primary_ability, saving_throws, skill_proficiencies, tool_proficiencies, 
  armor_proficiencies, weapon_proficiencies, starting_equipment, multiclass_requirements, source_id, homebrew
)
VALUES (
  gen_random_uuid(), 
  'Artificer', 
  'Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects. They see magic as a complex system waiting to be decoded and then harnessed in their spells and inventions.', 
  8, 
  'Intelligence', 
  '["Constitution", "Intelligence"]', 
  '["Arcana", "History", "Investigation", "Medicine", "Nature", "Perception", "Sleight of Hand"]', 
  '["Thieves'' tools", "Tinker''s tools", "One type of artisan''s tools of your choice"]', 
  '["Light armor", "Medium armor", "Shields"]', 
  '["Simple weapons"]', 
  '{"weapons": ["Any two simple weapons", "A light crossbow and 20 bolts"], "armor": ["(a) studded leather armor or (b) scale mail"], "tools": ["Thieves’ tools and a dungeoneer’s pack"], "gold": "5d4x10 starting gold"}', 
  '{"Intelligence": 13}', 
  null,  -- Assuming this is a core class from an official source
  false
);
