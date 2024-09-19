"use client";  // Required for client-side interactivity

import { useRouter } from 'next/navigation';  // For navigation

export default function CharacterList({ characters, onEdit }) {
  const router = useRouter();

  const goToCreateCharacter = () => {
    router.push('/create-character');  // Navigate to the create character page
  };

  const goToCharacterDetails = (characterId) => {
    router.push(`/characters/${characterId}`);  // Navigate to the character details page
  };

  return (
    <div>
      <h2>Character List</h2>
      <ul>
        {characters.length > 0 ? (
          characters.map((character) => (
            <li key={character.id}>
              <strong onClick={() => goToCharacterDetails(character.id)} style={{ cursor: 'pointer' }}>
                {character.character_name}
              </strong> - {character.class} - {character.species}
            </li>
          ))
        ) : (
          <p>No characters found</p>
        )}
      </ul>

      {/* Button to create a new character */}
      <button onClick={goToCreateCharacter}>Create New Character</button>
    </div>
  );
}
