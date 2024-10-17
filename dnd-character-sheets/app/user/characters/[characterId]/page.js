'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharactersRequest, addCharacterRequest } from '../../src/redux/actions/characters';

export default function MyCharactersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Select characters from Redux store
  const { characters, loading, error } = useSelector((state) => state.characters);

  useEffect(() => {
    // Dispatch action to fetch the user's characters
    dispatch(fetchCharactersRequest());
  }, [dispatch]);

  const createCharacter = () => {
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

    // Dispatch action to create a new character
    dispatch(addCharacterRequest({ userId, token })).then((newCharacter) => {
      if (newCharacter) {
        router.push(`/user/characters/${newCharacter.id}/create`);
      }
    });
  };

  return (
    <div>
      <h1>My Characters</h1>
      <button onClick={createCharacter}>Create New Character</button>

      {loading ? (
        <p>Loading characters...</p>
      ) : error ? (
        <p>Error loading characters: {error}</p>
      ) : characters.length > 0 ? (
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
