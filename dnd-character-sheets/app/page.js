"use client";  // Required for client-side interactivity

import CreateCharacter from "./components/CreateCharacter";
import CharacterList from "./components/CharacterList";  // Import the CharacterList component
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);  // To track client-side rendering
  const [characters, setCharacters] = useState([]);  // State to hold characters
  const [loading, setLoading] = useState(true);  // Loading state for the character fetching

  useEffect(() => {
    setIsClient(true);  // Mark component as client-rendered

    // Fetch characters from the API
    async function fetchCharacters() {
      try {
        const res = await fetch('/api/characters');
        if (res.ok) {
          const data = await res.json();
          setCharacters(data);  // Set fetched characters into state
        } else {
          console.error('Failed to fetch characters');
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    }

    fetchCharacters();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  if (!isClient) {
    return null;  // Prevent any rendering during the server-side pass
  }

  return (
    <div>
      <h1>Dungeons and Dragons Characters</h1>
      
      {/* Character Creation Form */}
      <CreateCharacter />

      {/* Character List */}
      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <CharacterList characters={characters} />  // Pass the fetched characters to the CharacterList component
      )}
    </div>
  );
}
