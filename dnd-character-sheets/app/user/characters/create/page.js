export default function CreateCharacterPage() {
    const router = useRouter();
  
    const createCharacter = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/characters/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ character_name: 'New Character' }),  // Example character creation
      });
  
      if (res.ok) {
        const data = await res.json();
        router.push(`/user/characters/${data.character_id}`);
      } else {
        console.error('Failed to create character');
      }
    };
  
    return (
      <div>
        <h1>Create New Character</h1>
        <button onClick={createCharacter}>Create</button>
      </div>
    );
  }
  