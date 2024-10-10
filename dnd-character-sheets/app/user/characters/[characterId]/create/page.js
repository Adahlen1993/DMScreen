'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import CharacterPreferencesTab from '../../../../components/CharacterPreferencesTab';  // Import the actual CharacterPreferencesTab component
import CharacterClassTab from '../../../../components/ClassTab';



export default function CreateCharacterTabs() {
  const { characterId } = useParams();  // Get characterId from URL params
  const [activeTab, setActiveTab] = useState('preferences');
console.log(characterId);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Create Character</h1>
      <div className="tabs">
        <button onClick={() => handleTabClick('preferences')} className={activeTab === 'preferences' ? 'active' : ''}>Character Preferences</button>
        <button onClick={() => handleTabClick('class')} className={activeTab === 'class' ? 'active' : ''}>Class</button>
        <button onClick={() => handleTabClick('background')} className={activeTab === 'background' ? 'active' : ''}>Background</button>
        <button onClick={() => handleTabClick('species')} className={activeTab === 'species' ? 'active' : ''}>Species</button>
        <button onClick={() => handleTabClick('abilities')} className={activeTab === 'abilities' ? 'active' : ''}>Abilities</button>
        <button onClick={() => handleTabClick('equipment')} className={activeTab === 'equipment' ? 'active' : ''}>Equipment</button>
      </div>

      <div className="tab-content">
        {activeTab === 'preferences' && <CharacterPreferencesTab characterId={characterId} />}
        {activeTab === 'class' && <CharacterClassTab characterId={characterId} />}
        {activeTab === 'background' && <CharacterBackground characterId={characterId} />}
        {activeTab === 'species' && <CharacterSpecies characterId={characterId} />}
        {activeTab === 'abilities' && <CharacterAbilities characterId={characterId} />}
        {activeTab === 'equipment' && <CharacterEquipment characterId={characterId} />}
      </div>
    </div>
  );
}

// Placeholder for the other tabs
function CharacterClass({ characterId }) {
  return <div>Class Content for Character ID: {characterId}</div>;
}

function CharacterBackground({ characterId }) {
  return <div>Background Content for Character ID: {characterId}</div>;
}

function CharacterSpecies({ characterId }) {
  return <div>Species Content for Character ID: {characterId}</div>;
}

function CharacterAbilities({ characterId }) {
  return <div>Abilities Content for Character ID: {characterId}</div>;
}

function CharacterEquipment({ characterId }) {
  return <div>Equipment Content for Character ID: {characterId}</div>;
}
