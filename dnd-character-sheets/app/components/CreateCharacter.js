"use client";  // Required for client-side interactivity
import { useState } from 'react';
import CharacterDetailsTab from './CharacterDetailsTab';  // We'll create this component as an example

export default function CreateCharacterPage() {
  const [activeTab, setActiveTab] = useState('Character Details');  // Set initial tab

  // List of tabs for each table
  const tabs = [
    'Class', 'Race', 'Inventory', 'Spells', 'Feats', 'Background', 
    'Character Details', 'Physical Details', 'Personal Characteristics', 'Creation Notes'
  ];

  // Handle changing the active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <h1>Create Your D&D Character</h1>

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
        {activeTab === 'Character Details' && <CharacterDetailsTab />}
        {/* We will add the other tab components like ClassTab, RaceTab, etc. later */}
        {/* Example: activeTab === 'Class' && <ClassTab /> */}
      </div>
    </div>
  );
}
