"use client";  // Required for client-side interactivity
import { useState } from 'react';
import CharacterDetailsTab from './CharacterDetailsTab';  // Character Details Component
import CharacterPreferencesTab from './CharacterPreferencesTab';  // Character Preferences Component
import ClassTab from './ClassTab';

export default function CreateCharacterPage() {
  const [activeTab, setActiveTab] = useState('Character Preferences');  // Default to Character Preferences

  // List of tabs for each table, starting with Character Preferences
  const tabs = [
    'Character Preferences', 'Character Details', 'Class', 'Species', 
    'Inventory', 'Spells', 'Feats', 'Background', 'Physical Details', 
    'Personal Characteristics', 'Creation Notes', 'Abilities'
  ];

  // Handle changing the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>{activeTab}</h1>

      {/* Tab Navigation */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => handleTabChange(tab)} 
            className={activeTab === tab ? 'active' : ''}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'Character Preferences' && <CharacterPreferencesTab />}
        {activeTab === 'Character Details' && <CharacterDetailsTab />}
        {activeTab === 'Class' && <ClassTab />}
        {/* Add other tabs/components like ClassTab, SpeciesTab, etc. as needed */}
      </div>
    </div>
  );
}
