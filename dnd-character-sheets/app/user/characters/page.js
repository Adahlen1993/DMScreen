"use client"; // Add this to mark the component as client-side

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharactersRequest, createCharacterRequest } from "../../../src/redux/actions/characters/index";

export default function MyCharactersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Select characters state from Redux store
  const { characters, loading, error } = useSelector((state) => state.characters);

  // Debug: Log characters state to verify if it's being updated
  console.log('Characters State:', { characters, loading, error });

  // Fetch characters on component mount
  useEffect(() => {
    dispatch(fetchCharactersRequest());
  }, [dispatch]);

  // Create a new character
  const createCharacter = () => {
    dispatch(createCharacterRequest());
  };

  // Navigate to the character sheet
  const goToCharacterSheet = (characterId) => {
    router.push(`/user/characters/${characterId}`);
  };

  return (
    <div>
      <h1>My Characters</h1>
      <button onClick={createCharacter} disabled={loading}>
        {loading ? "Creating..." : "Create New Character"}
      </button>

      {loading && <p>Loading characters...</p>}
      {error && <p>Error loading characters: {error}</p>}

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
        !loading && <p>You have no characters yet.</p>
      )}
    </div>
  );
}
