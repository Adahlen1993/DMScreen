"use client";  // Required for client-side interactivity

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // To handle routing

export default function CharacterDetailsPage() {
  const { id } = useParams();  // Get the character ID from the URL
  const [character, setCharacter] = useState(null);
  const router = useRouter();  // Next.js router for navigation

  useEffect(() => {
    if (id) {
      fetchCharacterDetails(id);
    }
  }, [id]);

  const fetchCharacterDetails = async (characterId) => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    try {
      const res = await fetch(`/api/characters/${characterId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,  // Include token in Authorization header
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCharacter(data);
      } else {
        console.error('Failed to fetch character details:', res.status, res.statusText);
      }
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  if (!character) {
    return <p>Loading character details...</p>;
  }

  const goBack = () => {
    router.push('/');  // Navigate to the create character page
  };

  return (
    <>
    <div>
      <h1>{character.character_name}</h1>
      <p>Class: {character.class}</p>
      <p>Species: {character.species}</p>
      <p>Background: {character.background}</p>
      <p>Notes: {character.notes}</p>
      {/* Display more character details */}
    </div>
    <div>
        <button onClick={goBack}>
            Go Back
        </button>
    </div>
    </>
  );
}
