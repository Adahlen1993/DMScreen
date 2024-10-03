"use client"; // Add this to mark the component as client-side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyCharactersPage() {
  const [characters, setCharacters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's characters from the API
    const fetchCharacters = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/characters", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCharacters(data.characters); // Assuming the response has a "characters" array
      } else {
        console.error("Failed to fetch characters");
      }
    };

    fetchCharacters();
  }, []);

  // Navigate to the character sheet
  const goToCharacterSheet = (characterId) => {
    router.push(`/user/characters/${characterId}`);
  };

  // Create a new character and redirect to the character creation tabs
  const createCharacter = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User ID or token not found.");
      return;
    }

    try {
      const res = await fetch("/api/characters/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Passing userId to the API
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/user/characters/${data.character_id}/create`); // Redirect to character creation tabs with characterId
      } else {
        console.error("Failed to create character");
      }
    } catch (error) {
      console.error("Error creating character:", error);
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
              <a onClick={() => goToCharacterSheet(character.id)}>
                {character.character_id}
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
