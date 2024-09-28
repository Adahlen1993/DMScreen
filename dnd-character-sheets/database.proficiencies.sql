-- Armor-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Heavy Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
       (gen_random_uuid(), 'Light Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
       (gen_random_uuid(), 'Medium Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
       (gen_random_uuid(), 'Shields', (SELECT id FROM proficiency_types WHERE name = 'Armor'));

-- Weapon-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Simple Weapons', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Martial Weapons', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Battleaxe', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Blowgun', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Club', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Dagger', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Dart', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Flail', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Glaive', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Greataxe', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Greatclub', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Greatsword', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Halberd', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Hand Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Handaxe', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Heavy Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Improvised Weapon', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Javelin', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Lance', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Light Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Light Hammer', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Longbow', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Longsword', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Mace', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Maul', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Morningstar', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Musket', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Net', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Pike', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Pistol', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Quarterstaff', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Rapier', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Scimitar', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Shortbow', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Shortsword', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Sickle', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Sling', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Spear', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Trident', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Unarmed Strike', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'War Pick', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Warhammer', (SELECT id FROM proficiency_types WHERE name = 'Weapons')),
       (gen_random_uuid(), 'Whip', (SELECT id FROM proficiency_types WHERE name = 'Weapons'));

-- Skills-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Acrobatics', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Animal Handling', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Arcana', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Athletics', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Deception', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'History', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Insight', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Intimidation', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Investigation', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Medicine', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Nature', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Perception', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Performance', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Persuasion', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Religion', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Sleight of Hand', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Stealth', (SELECT id FROM proficiency_types WHERE name = 'Skills')),
       (gen_random_uuid(), 'Survival', (SELECT id FROM proficiency_types WHERE name = 'Skills'));

-- Tools-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Alchemist''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Bagpipes', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Brewer''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Calligrapher''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Carpenter''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Cartographer''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Cobbler''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Cook''s Utensils', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Dice Set', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Disguise Kit', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Dragonchess Set', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Drum', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Dulcimer', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Forgery Kit', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Glassblower''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Herbalism Kit', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Horn', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Jeweler''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Land Vehicles', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Leatherworker''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Lute', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Lyre', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Mason''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Navigator''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Painter''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Pan Flute', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Playing Card Set', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Poisoner''s Kit', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Potter''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Shawm', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Smith''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Thieves'' Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Three-Dragon Ante Set', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Tinker''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Viol', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Water Vehicles', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Weaver''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools')),
       (gen_random_uuid(), 'Woodcarver''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tools'));

-- Language-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Abyssal', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Celestial', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Common', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Common Sign Language', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Deep Speech', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Draconic', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Druidic', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Dwarvish', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Elvish', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Giant', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Gnomish', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Goblin', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Halfling', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Infernal', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Orc', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Primordial', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Sylvan', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Thieves'' Cant', (SELECT id FROM proficiency_types WHERE name = 'Languages')),
       (gen_random_uuid(), 'Undercommon', (SELECT id FROM proficiency_types WHERE name = 'Languages'));

-- Saving Throws-related Proficiencies
INSERT INTO proficiencies (id, name, proficiency_type_id)
VALUES (gen_random_uuid(), 'Strength Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws')),
       (gen_random_uuid(), 'Dexterity Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws')),
       (gen_random_uuid(), 'Constitution Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws')),
       (gen_random_uuid(), 'Intelligence Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws')),
       (gen_random_uuid(), 'Wisdom Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws')),
       (gen_random_uuid(), 'Charisma Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throws'));


--Barbarian--
-- light armor
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', '321414d8-d3c3-434d-8991-70621c28cc13', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- medium armor
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', '1d97a315-9202-40d2-be22-d659ed5b4658', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- shield
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'e134f4ee-1eb3-469e-8add-a76b6805f729', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- simple weapons
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'ac21c050-42e6-45ff-9508-6d47ed3b9351', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- martial weapons
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', '0e186427-e1ec-44fe-9e8b-6ee22fe46113', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- strength saving throw
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'a0696c78-829e-4f10-8b31-b6e8b1d757a0', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- constitution saving throw
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', '52050ff2-0d79-4f77-9277-61602cf5d01a', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- animal handling
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'b93aadfa-9b92-4088-b036-574867244a13', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- athletics
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', '46bcb542-358a-4b25-b48f-b961b12eee99', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- intimidation
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'd298e251-f932-4b71-96fe-080f6da3a5af', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- nature 
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'cd63697a-a884-4dc3-92e0-2354c6cf072d', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- perception 
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'e426162e-b138-4ed1-982f-eb69de4b4eeb', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- Survival
INSERT INTO class_proficiencies (id, class_id, proficiency_id, created_at, updated_at)
VALUES (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 'f4cbacfd-4083-4ced-99c6-cd5f0ab7c8a3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
