
INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Hit Points',
  'Hit Dice: 1d12 per barbarian level. Hit Points at 1st Level: 12 + your Constitution modifier. Hit Points at Higher Levels: 1d12 (or 7) + your Constitution modifier per barbarian level after 1st.',
  1,  -- This applies from level 1 onward
  '{"hit_dice": "1d12 per barbarian level", "hp_at_1st_level": "12 + Constitution modifier", "hp_at_higher_levels": "1d12 (or 7) + Constitution modifier"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Proficiencies',
  'Armor: Light armor, medium armor, shields. Weapons: Simple weapons, martial weapons. Tools: None. Saving Throws: Strength, Constitution. Skills: Choose two from Animal Handling, Athletics, Intimidation, Nature, Perception, and Survival.',
  1,  -- Available from level 1
  '{
    "armor": ["Light armor", "Medium armor", "Shields"],
    "weapons": ["Simple weapons", "Martial weapons"],
    "tools": "None",
    "saving_throws": ["Strength", "Constitution"],
    "skills": {
      "choose": 2,
      "options": ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"]
    }
  }'
);




INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),  -- Assuming the class is already in the classes table
  'Rage',  -- Feature name
  'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action.

While raging, you gain the following benefits if you aren''t wearing heavy armor:

- You have advantage on Strength checks and Strength saving throws.
- When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.
- You have resistance to bludgeoning, piercing, and slashing damage.
- If you are able to cast spells, you can''t cast them or concentrate on them while raging.

Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you haven''t attacked a hostile creature since your last turn or taken damage since then. You can also end your rage on your turn as a bonus action.

Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.',  -- Description of the feature
  1,  -- Level at which this feature is unlocked (Barbarian level 1)
  '{"advantage": "Strength checks and saving throws", "damage_bonus": "increases as you gain levels", "resistance": ["bludgeoning", "piercing", "slashing"], "spell_casting_restriction": "cannot cast or concentrate while raging", "rage_duration": "1 minute", "rage_end_conditions": ["knocked unconscious", "no attack or damage taken"]}'  -- Modifiers in JSONB format
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Unarmored Defense',
  'While you are not wearing any armor, your armor class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.',
  1,  -- This is available at level 1
  '{"armor_class": "10 + Dexterity modifier + Constitution modifier", "shield_compatible": true}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Danger Sense',
  'At 2nd level, you gain an uncanny sense of when things nearby aren''t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can''t be blinded, deafened, or incapacitated.',
  2,  -- This feature is unlocked at level 2
  '{"advantage": "Dexterity saving throws against visible effects", "restrictions": ["cannot be blinded", "cannot be deafened", "cannot be incapacitated"]}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Reckless Attack',
  'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.',
  2,  -- This feature is unlocked at level 2
  '{"advantage_on_attacks": "Strength-based melee attacks", "disadvantage": "attack rolls against you have advantage"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Primal Path',
  'At 3rd level, you choose a path that shapes the nature of your rage. Your choice grants you features at 3rd level and again at 6th, 10th, and 14th levels.',
  3,  -- This feature is unlocked at level 3
  '{"grants_features_at_levels": [3, 6, 10, 14], "feature_type": "subclass"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Primal Knowledge (Optional)',
  'When you reach 3rd level and again at 10th level, you gain proficiency in one skill of your choice from the list of skills available to barbarians at 1st level.',
  3,
  '{"gained_at_levels": [3, 10], "proficiency_choice": "skill from Barbarian skill list"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Ability Score Improvement',
  'When you reach 4th level, and again at 8th, 12th, 16th, and 19th level, you can increase one ability score of your choice by 2, or you can increase two ability scores of your choice by 1. As normal, you can''t increase an ability score above 20 using this feature.',
  4,
  '{"gained_at_levels": [4, 8, 12, 16, 19], "ability_score_increase": "increase one score by 2 or two scores by 1", "max_score": 20}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Extra Attack',
  'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.',
  5,
  '{"extra_attacks": 1}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Fast Movement',
  'Starting at 5th level, your speed increases by 10 feet while you aren''t wearing heavy armor.',
  5,
  '{"speed_increase": "10 feet", "restriction": "no heavy armor"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Feral Instinct',
  'By 7th level, your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren''t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.',
  7,
  '{"advantage": "initiative rolls", "special_condition": "can act normally when surprised if rage is used first"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Instinctive Pounce (Optional)',
  'At 7th level, as part of the bonus action you take to enter your rage, you can move up to half your speed.',
  7,
  '{"bonus_action": "move up to half speed when entering rage"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Brutal Critical',
  'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack. This increases to two additional dice at 13th level and three additional dice at 17th level.',
  9,
  '{"gained_at_levels": [9, 13, 17], "extra_damage_dice": [1, 2, 3]}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Relentless Rage',
  'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you''re raging and don''t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead. Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.',
  11,
  '{"dc_start": 10, "dc_increase_per_use": 5, "reset_on_rest": true}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Persistent Rage',
  'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.',
  15,
  '{"rage_end_conditions": ["fall unconscious", "choose to end"]}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Indomitable Might',
  'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.',
  18,
  '{"strength_check_override": "use Strength score if total is lower"}'
);

INSERT INTO class_features (class_id, feature_name, description, level, modifier)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),
  'Primal Champion',
  'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.',
  20,
  '{"stat_increase": {"Strength": 4, "Constitution": 4}, "max_stat_limit": 24}'
);


INSERT INTO subclasses (class_id, subclass_name, description, created_at, updated_at)
VALUES (
  (SELECT id FROM classes WHERE class_name = 'Barbarian'),  -- Link to the Barbarian class
  'Path of the Ancestral Guardian',
  'Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living. When a barbarian who follows this path rages, the barbarian contacts the spirit world and calls on these guardian spirits for aid.

Barbarians who draw on their ancestral guardians can better fight to protect their tribes and their allies. In order to cement ties to their ancestral guardians, barbarians who follow this path cover themselves in elaborate tattoos that celebrate their ancestors’ deeds. These tattoos tell sagas of victories against terrible monsters and other fearsome rivals.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO subclass_features (subclass_id, level, feature_name, description, modifier, created_at, updated_at)
VALUES (
  (SELECT id FROM subclasses WHERE subclass_name = 'Path of the Ancestral Guardian'),
  3,
  'Ancestral Protectors',
  'Starting when you choose this path at 3rd level, spectral warriors appear when you enter your rage. While you''re raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn''t against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack. The effect on the target ends early if your rage ends.',
  '{"disadvantage_on_attacks": "target creature has disadvantage on attack rolls not against you", "resistance": "allies gain resistance to damage from target"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO subclass_features (subclass_id, level, feature_name, description, modifier, created_at, updated_at)
VALUES (
  (SELECT id FROM subclasses WHERE subclass_name = 'Path of the Ancestral Guardian'),
  6,
  'Spirit Shield',
  'Beginning at 6th level, the guardian spirits that aid you can provide supernatural protection to those you defend. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6. When you reach certain levels in this class, you can reduce the damage by more: by 3d6 at 10th level and by 4d6 at 14th level.',
  '{"damage_reduction": [2, 3, 4], "range": "30 feet", "levels": [6, 10, 14]}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO subclass_features (subclass_id, level, feature_name, description, modifier, created_at, updated_at)
VALUES (
  (SELECT id FROM subclasses WHERE subclass_name = 'Path of the Ancestral Guardian'),
  10,
  'Consult the Spirits',
  'At 10th level, you gain the ability to consult with your ancestral spirits. When you do so, you cast the Augury or Clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location. Wisdom is your spellcasting ability for these spells. After you cast either spell in this way, you can''t use this feature again until you finish a short or long rest.',
  '{"spells": ["Augury", "Clairvoyance"], "spellcasting_ability": "Wisdom", "usage_limit": "once per short or long rest"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

INSERT INTO subclass_features (subclass_id, level, feature_name, description, modifier, created_at, updated_at)
VALUES (
  (SELECT id FROM subclasses WHERE subclass_name = 'Path of the Ancestral Guardian'),
  14,
  'Vengeful Ancestors',
  'At 14th level, when you use your Spirit Shield to reduce the damage of an attack, the attacker takes an amount of force damage that your Spirit Shield prevents.',
  '{"retaliation_damage": "equal to damage prevented by Spirit Shield"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);
