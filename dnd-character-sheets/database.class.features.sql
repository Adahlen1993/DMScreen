
------------------------------------------------------BARBARIAN---------------------------------------------------------

INSERT INTO class_features (
  id, class_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1',  -- Barbarian class ID
  1,  -- Rage is available at level 1
  'Rage', 
  'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren''t wearing heavy armor: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll, which increases as you gain levels. You have resistance to bludgeoning, piercing, and slashing damage. If you are able to cast spells, you can''t cast them or concentrate on them while raging. Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action. Once you have raged the number of times shown for your barbarian level in the Rages column, you must finish a long rest before you can rage again.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

INSERT INTO class_features (
  id, class_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1',  -- Barbarian class ID
  1,  -- Unarmored Defense is available at level 1
  'Unarmored Defense', 
  'While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

INSERT INTO class_features (
  id, class_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1',  -- Barbarian class ID
  2,  -- Danger Sense is available at level 2
  'Danger Sense', 
  'At 2nd level, you gain an uncanny sense of when things nearby aren''t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can''t be blinded, deafened, or incapacitated.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

INSERT INTO class_features (
  id, class_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1',  -- Barbarian class ID
  2,  -- Reckless Attack is available at level 2
  'Reckless Attack', 
  'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 3, 'Primal Knowledge (Optional)', 'When you reach 3rd level and again at 10th level, you gain proficiency in one skill of your choice from the list of skills available to barbarians at 1st level.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 10, 'Primal Knowledge (Optional)', 'When you reach 3rd level and again at 10th level, you gain proficiency in one skill of your choice from the list of skills available to barbarians at 1st level.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 4, 'Ability Score Improvement', 
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 8, 'Ability Score Improvement', 
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 12, 'Ability Score Improvement', 
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 16, 'Ability Score Improvement', 
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 19, 'Ability Score Improvement', 
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.', 
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 5, 'Extra Attack', 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 5, 'Fast Movement', 'Starting at 5th level, your speed increases by 10 feet while you aren''t wearing heavy armor.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 7, 'Feral Instinct', 'By 7th level, your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren''t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 7, 'Instinctive Pounce (Optional)', 'At 7th level, as part of the bonus action you take to enter your rage, you can move up to half your speed.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 9, 'Brutal Critical', 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 13, 'Brutal Critical', 'This increases to two additional dice at 13th level.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 17, 'Brutal Critical', 'This increases to three additional dice at 17th level.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 11, 'Relentless Rage', 'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you''re raging and don''t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead. Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 15, 'Persistent Rage', 'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 18, 'Indomitable Might', 'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO class_features (id, class_id, level, feature_name, description, created_at, updated_at) 
VALUES 
  (gen_random_uuid(), 'bafe81e3-b3f4-43e0-b673-0e20f93cd1d1', 20, 'Primal Champion', 'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

------------------------------------------------------BARBARIAN SubClass---------------------------------------------------------

-------ANCESTRAL GUARDIAN---
-- Insert Ancestral Protectors (3rd level feature)
INSERT INTO subclass_features (
  id, subclass_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  '48869614-03db-44ee-a11f-4094ae484136',  -- Replace with actual subclass ID
  3, 
  'Ancestral Protectors', 
  'Starting when you choose this path at 3rd level, spectral warriors appear when you enter your rage. While you''re raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn''t against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack. The effect on the target ends early if your rage ends.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

-- Insert Spirit Shield (6th level feature)
INSERT INTO subclass_features (
  id, subclass_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  '48869614-03db-44ee-a11f-4094ae484136',  -- Replace with actual subclass ID
  6, 
  'Spirit Shield', 
  'Beginning at 6th level, the guardian spirits that aid you can provide supernatural protection to those you defend. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6. When you reach certain levels in this class, you can reduce the damage by more: by 3d6 at 10th level and by 4d6 at 14th level.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

-- Insert Consult the Spirits (10th level feature)
INSERT INTO subclass_features (
  id, subclass_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  '48869614-03db-44ee-a11f-4094ae484136',  -- Replace with actual subclass ID
  10, 
  'Consult the Spirits', 
  'At 10th level, you gain the ability to consult with your ancestral spirits. When you do so, you cast the Augury or Clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location. After you cast either spell in this way, you can''t use this feature again until you finish a short or long rest.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);

-- Insert Vengeful Ancestors (14th level feature)
INSERT INTO subclass_features (
  id, subclass_id, level, feature_name, description, created_at, updated_at
) VALUES (
  gen_random_uuid(), 
  '48869614-03db-44ee-a11f-4094ae484136',  -- Replace with actual subclass ID
  14, 
  'Vengeful Ancestors', 
  'At 14th level, your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes an amount of force damage that your Spirit Shield prevents.',
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
);
