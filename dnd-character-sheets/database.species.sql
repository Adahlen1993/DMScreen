INSERT INTO species (species_name, description, ability_bonuses, size, speed)
VALUES (
  'Elf', 
  'Created by the god Corellon, the first elves could change their forms at will. They lost this ability when Corellon cursed them for plotting with the deity Lolth, who tried and failed to usurp Corellon’s dominion. When Lolth was cast into the Abyss, most elves renounced her and earned Corellon’s forgiveness, but that which Corellon had taken from them was lost forever. No longer able to shape-shift at will, the elves retreated to the Feywild, where their sorrow was deepened by that plane’s influence. Over time, curiosity led many of them to explore other planes of existence, including worlds in the Material Plane. Elves have pointed ears and lack facial and body hair. They live for around 750 years, and they don’t sleep but instead enter a trance when they need to rest. In that state, they remain aware of their surroundings while immersing themselves in memories and meditations. An environment subtly transforms elves after they inhabit it for a millennium or more, and it grants them certain kinds of magic. Drow, high elves, and wood elves are examples of elves who have been transformed thus.',
  NULL,    -- No ability bonuses for the main species since sub-species handle that
  'Medium', 
  30
);

INSERT INTO sub_species (species_id, sub_species_name, description, ability_bonuses, size, speed)
VALUES (
  (SELECT id FROM species WHERE species_name = 'Elf'),  -- Link to Elf species
  'High Elf',
  'As a high elf, you have a keen mind and a mastery of at least the basics of magic.',
  '{"dexterity": 2, "intelligence": 1}',   -- High Elf ability bonuses
  'Medium',
  30
);

INSERT INTO sub_species (species_id, sub_species_name, description, ability_bonuses, size, speed)
VALUES (
  (SELECT id FROM species WHERE species_name = 'Elf'),  -- Link to Elf species
  'Wood Elf',
  'As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests.',
  '{"dexterity": 2, "wisdom": 1}',   -- Wood Elf ability bonuses
  'Medium',
  35   -- Wood Elves have a higher speed than other elves
);

INSERT INTO sub_species (species_id, sub_species_name, description, ability_bonuses, size, speed)
VALUES (
  (SELECT id FROM species WHERE species_name = 'Elf'),  -- Link to Elf species
  'Drow (Dark Elf)',
  'Descended from an earlier subrace of dark-skinned elves, the drow were banished from the surface world for following the goddess Lolth down the path to evil and corruption.',
  '{"dexterity": 2, "charisma": 1}',   -- Drow ability bonuses
  'Medium',
  30
);
