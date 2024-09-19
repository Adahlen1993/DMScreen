"use client";  // Required for client-side interactivity

import { useState } from 'react';

export default function CharacterList({ characters, onEdit }) {
  return (
    <div>
      <h2>Character List</h2>
      <ul>
        {characters.length > 0 ? (
          characters.map((character) => (
            <li key={character.id}>
              <strong>{character.character_name}</strong> - {character.class} - {character.species}
              {/* Edit button */}
              <button onClick={() => onEdit(character)}>Edit</button>
            </li>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </ul>
    </div>
  );
}
