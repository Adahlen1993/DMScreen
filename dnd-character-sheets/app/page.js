"use client";  // Required for client-side interactivity

import CharacterList from "./components/CharacterList";  // Import the CharacterList component
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';  // To handle routing

export default function Home() {
  const [characters, setCharacters] = useState([]);  // State to hold characters
  const [loading, setLoading] = useState(true);  // Loading state for the character fetching
  const router = useRouter();  // Next.js router for navigation

  useEffect(() => {
    // Fetch characters from the API
    async function fetchCharacters() {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage

      try {
        const res = await fetch('/api/characters', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Pass token in Authorization header
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCharacters(data);  // Set fetched characters into state
        } else {
          console.error('Failed to fetch characters:', res.status, res.statusText);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    }

    fetchCharacters();
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  const goToCreateCharacter = () => {
    router.push('/create-character');  // Navigate to the create character page
  };

  return (
    <div>
      <h1>Dungeons and Dragons Characters</h1>
      
      {/* Button to navigate to the create character page */}
      <button onClick={goToCreateCharacter}>Create New Character</button>

      {/* Character List */}
      {loading ? (
        <p>Loading characters...</p>
      ) : (
        <CharacterList characters={characters} />  // Pass the fetched characters to the CharacterList component
      )}
    </div>
  );
}
