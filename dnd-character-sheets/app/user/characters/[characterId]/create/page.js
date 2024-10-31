'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import CharacterPreferencesTab from '../../../../components/CharacterPreferencesTab';  // Import the actual CharacterPreferencesTab component
import ClassTab from '../../../../components/ClassTab';
import CharacterClassTab from '../../../../components/CharacterClassTab';
import { fetchCharacterClassesRequest } from '../../../../../src/redux/actions/characters/class/index';

export default function CreateCharacterTabs() {
  const { characterId } = useParams();  // Get characterId from URL params
  const [activeTab, setActiveTab] = useState('preferences');
  const dispatch = useDispatch();
  const { characterClasses } = useSelector((state) => state.characters);
  console.log(characterClasses.length);
  useEffect(() => {
    // Fetch character classes on initial mount
    if (characterId) {
      dispatch(fetchCharacterClassesRequest(characterId));
    }
  }, [dispatch, characterId]);

  useEffect(() => {
    // If character has a class, set active tab to character-class
    if (characterClasses.length > 0 && activeTab === 'class') {
      setActiveTab('character-class');
    }
  }, [characterClasses, activeTab]);

  console.log(characterId);

  const handleTabClick = (tab) => {
    if (tab === 'class' && characterClasses.length > 0) {
      setActiveTab('character-class');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div>
      <h1>Create Character</h1>
      <div className="tabs">
        <button onClick={() => handleTabClick('preferences')} className={activeTab === 'preferences' ? 'active' : ''}>Character Preferences</button>
        <button onClick={() => handleTabClick('class')} className={activeTab === 'class' || activeTab === 'character-class' ? 'active' : ''}>Class</button>
        <button onClick={() => handleTabClick('background')} className={activeTab === 'background' ? 'active' : ''}>Background</button>
        <button onClick={() => handleTabClick('species')} className={activeTab === 'species' ? 'active' : ''}>Species</button>
        <button onClick={() => handleTabClick('abilities')} className={activeTab === 'abilities' ? 'active' : ''}>Abilities</button>
        <button onClick={() => handleTabClick('equipment')} className={activeTab === 'equipment' ? 'active' : ''}>Equipment</button>
      </div>

      <div className="tab-content">
        {activeTab === 'preferences' && <CharacterPreferencesTab characterId={characterId} />}
        {activeTab === 'class' && <ClassTab characterId={characterId} setActiveTab={setActiveTab} />}
        {activeTab === 'background' && <CharacterBackground characterId={characterId} />}
        {activeTab === 'species' && <CharacterSpecies characterId={characterId} />}
        {activeTab === 'abilities' && <CharacterAbilities characterId={characterId} />}
        {activeTab === 'equipment' && <CharacterEquipment characterId={characterId} />}
        {activeTab === 'character-class' && <CharacterClassTab characterId={characterId} />}
      </div>
    </div>
  );
}

// Placeholder for the other tabs
function CharacterClass({ characterId, setActiveTab }) {
  // Example: setActiveTab('background') could be called from within this component
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
