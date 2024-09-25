"use client";  // Required for client-side interactivity
import { useState } from 'react';
import CharacterDetailsTab from './CharacterDetailsTab';  // We'll create this component as an example

export default function CreateCharacterPage() {
  const [activeTab, setActiveTab] = useState('Character Details');  // Set initial tab
  const [homebrewTrue, setHomebrewTrue] = useState(false);
  // List of tabs for each table
  const tabs = [
    'Character Details', 'Class', 'Species', 'Inventory', 'Spells', 'Feats', 'Background', 
    'Physical Details', 'Personal Characteristics', 'Creation Notes', 'Abilities'
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
        {activeTab === 'Character Details' && <CharacterDetailsTab />}
        {/* We will add the other tab components like ClassTab, RaceTab, etc. later */}
        {/* Example: activeTab === 'Class' && <ClassTab /> */}
      </div>
    </div>
  );
}
