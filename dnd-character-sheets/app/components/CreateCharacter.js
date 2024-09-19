"use client";  // Required for client-side interactivity

import { useState } from 'react';
import AbilityScores from './AbilityScores';  // Import the AbilityScores component

export default function CreateCharacter() {
  const [name, setName] = useState('');
  const [characterClass, setCharacterClass] = useState('');
  const [race, setRace] = useState('');
  const [abilityScores, setAbilityScores] = useState({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCharacter = {
      name,
      characterClass,
      race,
      abilityScores,  // Include the ability scores in the character data
    };

    // Send POST request to create character
    const res = await fetch('/api/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    setName('');
    setCharacterClass('');
    setRace('');
    setAbilityScores({
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
    });
  };

  return (
    <div>
      <h1>Create Your DnD Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Character Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
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
          <label>Character Race:</label>
          <input 
            type="text" 
            value={race} 
            onChange={(e) => setRace(e.target.value)} 
            placeholder="Character Race"
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
  );
}
