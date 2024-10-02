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

  // Function to create a new character and link it to the user
  const createCharacter = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');  // Assuming you store userId in localStorage

    const res = await fetch('/api/characters/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      const data = await res.json();
      // Redirect to the character creation page with the new character ID
      router.push(`/user/characters/create/${data.character_id}`);
    } else {
      console.error('Failed to create character');
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
