'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyCharactersPage() {
  const [characters, setCharacters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's characters
    const fetchCharacters = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/characters', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setCharacters(data.characters);
      } else {
        console.error('Failed to fetch characters');
      }
    };

    fetchCharacters();
  }, []);

  const createCharacter = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
  
    if (!userId) {
      console.error('User ID not found in localStorage.');
      return;
    }
  
    if (!token) {
      console.error('Token not found in localStorage.');
      return;
    }
  
    try {
      const res = await fetch('/api/characters/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),  // Pass the userId in the request
      });
  
      if (res.ok) {
        const data = await res.json();
        console.log('Character created successfully:', data);
        router.push(`/user/characters/${data.character_id}/create`);
      } else {
        const errorText = await res.text();
        console.error('Failed to create character. Status:', res.status, 'Message:', res.statusText, 'Error:', errorText);
      }
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };
  

  return (
    <div>
      <h1>My Characters</h1>
      <button onClick={createCharacter}>Create New Character</button>

      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <a onClick={() => router.push(`/user/characters/${character.id}`)}>
                {character.character_name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no characters yet.</p>
      )}
    </div>
  );
}
