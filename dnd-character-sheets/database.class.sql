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
