import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyCharactersPage() {
  const [characters, setCharacters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's characters from the API
    const fetchCharacters = async () => {
      const token = localStorage.getItem('token'); // Assuming you use a token for auth
      const res = await fetch('/api/characters', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setCharacters(data.characters);  // Assuming the response has a "characters" array
      } else {
        console.error('Failed to fetch characters');
      }
    };

    fetchCharacters();
  }, []);

  // Navigate to the character sheet
  const goToCharacterSheet = (characterId) => {
    router.push(`/user/characters/${characterId}`);
  };

  // Create a new character
  const createCharacter = () => {
    router.push('/user/characters/create');
  };

  return (
    <div>
      <h1>My Characters</h1>
      <button onClick={createCharacter}>Create New Character</button>

      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <a onClick={() => goToCharacterSheet(character.id)}>
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
