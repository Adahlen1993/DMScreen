"use client";  // Required for client-side interactivity

import { useState } from 'react';
import AbilityScores from './AbilityScores';  // Import the AbilityScores component
import { useRouter } from 'next/navigation';  // To handle routing

export default function CreateCharacter() {
  const [character_name, setCharacterName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [species, setSpecies] = useState('');
  const [character_details, setCharacterDetails] = useState('');
  const [background, setBackground] = useState('');
  const [notes, setNotes] = useState('');
  const [inventory, setInventory] = useState('');  // Allow empty string for now
  const [spells, setSpells] = useState('');  // Allow empty string for now
  const [feats, setFeats] = useState('');  // Allow empty string for now
  const router = useRouter();  // Next.js router for navigation

  const [abilityScores, setAbilityScores] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCharacter = {
      character_name,
      class: characterClass,
      species,
      character_details,
      background,
      notes,
      inventory: inventory ? JSON.parse(inventory) : null,  // Send null if empty
      spells: spells ? JSON.parse(spells) : null,  // Send null if empty
      feats: feats ? JSON.parse(feats) : null,  // Send null if empty
      abilityScores,
    };

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Send POST request to create character with Authorization header
    const res = await fetch('/api/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
      },
      body: JSON.stringify(newCharacter),
    });

    if (res.ok) {
      const result = await res.json();
      console.log('Character created:', result);
    } else {
      console.error('Error creating character');
    }

    // Clear the form fields
    setCharacterName('');
    setCharacterClass('');
    setSpecies('');
    setCharacterDetails('');
    setBackground('');
    setNotes('');
    setInventory('');
    setSpells('');
    setFeats('');
    setAbilityScores({
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    });
  };

  // Fill in test data
  const fillTestData = () => {
    setCharacterName('Test Character');
    setCharacterClass('Wizard');
    setSpecies('Elf');
    setCharacterDetails('A powerful wizard with a mysterious past.');
    setBackground('Noble');
    setNotes('Always curious, loves reading ancient tomes.');
    // setInventory(JSON.stringify([{ item: 'Magic Staff', quantity: 1 }, { item: 'Potion of Healing', quantity: 3 }]));  // JSON string
    // setSpells(JSON.stringify([{ spell: 'Fireball' }, { spell: 'Teleport' }]));  // JSON string
    // setFeats(JSON.stringify([{ feat: 'Tough' }, { feat: 'Spell Mastery' }]));  // JSON string
    setAbilityScores({
      Strength: 8,
      Dexterity: 14,
      Constitution: 12,
      Intelligence: 18,
      Wisdom: 16,
      Charisma: 10,
    });
  };

  const goBack = () => {
    router.push('/');  // Navigate to the create character page
  };

  return (
    <>
    <div>
      <h1>Create Your DnD Character</h1>
      <button onClick={fillTestData}>Test</button>  {/* Button to autofill form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Character Name:</label>
          <input 
            type="text" 
            value={character_name} 
            onChange={(e) => setCharacterName(e.target.value)} 
            placeholder="Character Name"
          />
        </div>
        <div>
          <label>Character Class:</label>
          <input 
            type="text" 
            value={characterClass} 
            onChange={(e) => setCharacterClass(e.target.value)} 
            placeholder="Character Class"
          />
        </div>
        <div>
          <label>Character Species:</label>
          <input 
            type="text" 
            value={species} 
            onChange={(e) => setSpecies(e.target.value)} 
            placeholder="Character Species"
          />
        </div>
        <div>
          <label>Character Details:</label>
          <input 
            type="text" 
            value={character_details} 
            onChange={(e) => setCharacterDetails(e.target.value)} 
            placeholder="Character Details"
          />
        </div>
        <div>
          <label>Background:</label>
          <input 
            type="text" 
            value={background} 
            onChange={(e) => setBackground(e.target.value)} 
            placeholder="Character Background"
          />
        </div>
        <div>
          <label>Notes:</label>
          <input 
            type="text" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Character Notes"
          />
        </div>
        <div>
          <label>Inventory (JSON Format or leave empty):</label>
          <input 
            type="text" 
            value={inventory} 
            onChange={(e) => setInventory(e.target.value)} 
            placeholder='e.g., [{"item": "Sword", "quantity": 1}]'
          />
        </div>
        <div>
          <label>Spells (JSON Format or leave empty):</label>
          <input 
            type="text" 
            value={spells} 
            onChange={(e) => setSpells(e.target.value)} 
            placeholder='e.g., [{"spell": "Fireball"}]'
          />
        </div>
        <div>
          <label>Feats (JSON Format or leave empty):</label>
          <input 
            type="text" 
            value={feats} 
            onChange={(e) => setFeats(e.target.value)} 
            placeholder='e.g., [{"feat": "Tough"}]'
          />
        </div>

        {/* AbilityScores component */}
        <AbilityScores 
          abilityScores={abilityScores} 
          setAbilityScores={setAbilityScores} 
        />

        <button type="submit">Create Character</button>
      </form>
    </div>
       <div>
       <button onClick={goBack}>
           Go Back
       </button>
   </div>
   </>
  );
}
