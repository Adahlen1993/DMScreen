
INSERT INTO proficiency_types (name, description)
VALUES 
    ('Armor', 'Proficiencies related to different types of armor, such as light, medium, and heavy armor.'),
    ('Weapon', 'Proficiencies related to different types of weapons, including martial and simple weapons.'),
    ('Tool', 'Proficiencies related to various tools, such as artisan tools, musical instruments, and gaming sets.'),
    ('Skill', 'Proficiencies related to character skills, such as Athletics, Arcana, and Persuasion.'),
    ('Saving Throw', 'Proficiencies related to saving throws, such as Dexterity, Wisdom, and Constitution saving throws.');
('Language', 'Proficiencies related to different languages.');

-- Armor-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Heavy Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
    ('Light Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
    ('Medium Armor', (SELECT id FROM proficiency_types WHERE name = 'Armor')),
    ('Shields', (SELECT id FROM proficiency_types WHERE name = 'Armor'));



-- Weapon-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Simple Weapons', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Martial Weapons', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Battleaxe', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Blowgun', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Club', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Dagger', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Dart', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Flail', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Glaive', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Greataxe', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Greatclub', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Greatsword', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Halberd', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Hand Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Handaxe', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Heavy Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Improvised Weapon', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Javelin', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Lance', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Light Crossbow', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Light Hammer', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Longbow', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Longsword', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Mace', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Maul', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Morningstar', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Musket', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Net', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Pike', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Pistol', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Quarterstaff', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Rapier', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Scimitar', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Shortbow', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Shortsword', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Sickle', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Sling', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Spear', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Trident', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Unarmed Strike', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('War Pick', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Warhammer', (SELECT id FROM proficiency_types WHERE name = 'Weapon')),
    ('Whip', (SELECT id FROM proficiency_types WHERE name = 'Weapon'));


-- Skills-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Acrobatics', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Animal Handling', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Arcana', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Athletics', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Deception', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('History', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Insight', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Intimidation', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Investigation', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Medicine', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Nature', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Perception', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Performance', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Persuasion', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Religion', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Sleight of Hand', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Stealth', (SELECT id FROM proficiency_types WHERE name = 'Skill')),
    ('Survival', (SELECT id FROM proficiency_types WHERE name = 'Skill'));


-- Tools-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Alchemist''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Bagpipes', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Brewer''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Calligrapher''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Carpenter''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Cartographer''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Cobbler''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Cook''s Utensils', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Dice Set', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Disguise Kit', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Dragonchess Set', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Drum', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Dulcimer', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Forgery Kit', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Glassblower''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Herbalism Kit', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Horn', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Jeweler''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Land Vehicles', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Leatherworker''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Lute', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Lyre', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Mason''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Navigator''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Painter''s Supplies', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Pan Flute', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Playing Card Set', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Poisoner''s Kit', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Potter''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Shawm', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Smith''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Thieves'' Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Three-Dragon Ante Set', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Tinker''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Viol', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Water Vehicles', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Weaver''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool')),
    ('Woodcarver''s Tools', (SELECT id FROM proficiency_types WHERE name = 'Tool'));


-- Language-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Abyssal', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Celestial', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Common', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Common Sign Language', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Deep Speech', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Draconic', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Druidic', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Dwarvish', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Elvish', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Giant', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Gnomish', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Goblin', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Halfling', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Infernal', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Orc', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Primordial', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Sylvan', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Thieves'' Cant', (SELECT id FROM proficiency_types WHERE name = 'Language')),
    ('Undercommon', (SELECT id FROM proficiency_types WHERE name = 'Language'));


-- Saving Throws-related Proficiencies
INSERT INTO proficiencies (name, proficiency_type_id)
VALUES 
    ('Strength Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw')),
    ('Dexterity Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw')),
    ('Constitution Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw')),
    ('Intelligence Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw')),
    ('Wisdom Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw')),
    ('Charisma Saving Throw', (SELECT id FROM proficiency_types WHERE name = 'Saving Throw'));



-- barbarian proficiencies --

-- Armor proficiencies (given)
INSERT INTO class_proficiencies (class_id, proficiency_id, is_given)
VALUES
    (1, (SELECT id FROM proficiencies WHERE name = 'Light armor'), true),
    (1, (SELECT id FROM proficiencies WHERE name = 'Medium armor'), true),
    (1, (SELECT id FROM proficiencies WHERE name = 'Shields'), true);

-- Weapon proficiencies (given)
INSERT INTO class_proficiencies (class_id, proficiency_id, is_given)
VALUES
    (1, (SELECT id FROM proficiencies WHERE name = 'Simple weapons'), true),
    (1, (SELECT id FROM proficiencies WHERE name = 'Martial weapons'), true);

-- Tool proficiencies (none)
-- No tools to add, so nothing to insert here

-- Saving Throws (given)
INSERT INTO class_proficiencies (class_id, proficiency_id, is_given)
VALUES
    (1, (SELECT id FROM proficiencies WHERE name = 'Strength'), true),
    (1, (SELECT id FROM proficiencies WHERE name = 'Constitution'), true);

-- Skills (choices)
INSERT INTO class_proficiencies (class_id, proficiency_id, is_given)
VALUES
    (1, (SELECT id FROM proficiencies WHERE name = 'Animal Handling'), false),
    (1, (SELECT id FROM proficiencies WHERE name = 'Athletics'), false),
    (1, (SELECT id FROM proficiencies WHERE name = 'Intimidation'), false),
    (1, (SELECT id FROM proficiencies WHERE name = 'Nature'), false),
    (1, (SELECT id FROM proficiencies WHERE name = 'Perception'), false),
    (1, (SELECT id FROM proficiencies WHERE name = 'Survival'), false);
