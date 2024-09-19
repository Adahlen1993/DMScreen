"use client"; // Required for client-side interactivity

import { useState } from 'react';

export default function AbilityScores({ abilityScores, setAbilityScores }) {
  const handleScoreChange = (ability, value) => {
    // Update the ability score state
    setAbilityScores((prevScores) => ({
      ...prevScores,
      [ability]: parseInt(value, 10) || 0,  // Ensure the value is a number
    }));
  };

  return (
    <div>
      <h2>Ability Scores</h2>
      <div>
        {Object.keys(abilityScores).map((ability) => (
          <div key={ability}>
            <label>{ability}:</label>
            <input
              type="number"
              value={abilityScores[ability]}
              onChange={(e) => handleScoreChange(ability, e.target.value)}
              placeholder={`Enter ${ability} score`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
