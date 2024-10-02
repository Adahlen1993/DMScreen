"use client";  // Mark this component as a client-side component

import { useRouter } from 'next/navigation';

export default function CreateCharacterPage() {
  const router = useRouter();

  const createCharacter = async () => {
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

    try {
      const res = await fetch('/api/characters/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),  // Pass the userId in the request
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/user/characters/${data.character_id}`);
      } else {
        // Log the status and statusText for more detailed error info
        const errorText = await res.text();
        console.error('Error details:', res.status, res.statusText, errorText);
      }
    } catch (error) {
      console.error('Error creating character:', error);
    }
  };

  return (
    <div>
      <h1>Create New Character</h1>
      <button onClick={createCharacter}>Create</button>
    </div>
  );
}
