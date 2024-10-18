"use client"; // Mark this as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharactersRequest,
  addCharacterRequest,
} from "../../../src/redux/actions/characters/index";

export default function MyCharactersPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Select characters state from Redux store
  const { characters, loading, error, newCharacter } = useSelector(
    (state) => state.characters
  );

  // Fetch characters on component mount
  useEffect(() => {
    dispatch(fetchCharactersRequest());
  }, [dispatch]);

  // When a new character is created successfully, navigate to the character creation page
  useEffect(() => {
    if (newCharacter) {
      console.log("Navigating to character creation page for:", newCharacter); // Debugging log
      router.push(`/user/characters/${newCharacter.character_id}/create`);
      // Dispatch an action to clear the newCharacter value after redirection
      dispatch({ type: "CLEAR_NEW_CHARACTER" });
    }
  }, [newCharacter, router, dispatch]);

  // Create a new character
  const createCharacter = () => {
    dispatch(addCharacterRequest());
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
            <li key={character.character_id}>
              <a onClick={() => goToCharacterSheet(character.character_id)}>
                {character.character_id}
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
