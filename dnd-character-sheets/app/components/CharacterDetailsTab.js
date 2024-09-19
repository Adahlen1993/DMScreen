import { useState } from 'react';

export default function CharacterDetailsTab() {
  const [alignment, setAlignment] = useState('');
  const [faith, setFaith] = useState('');
  const [lifestyle, setLifestyle] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { alignment, faith, lifestyle, name };
    console.log('Character Details:', details);
    // You can submit the data to the server here
  };

  return (
    <div>
      <h2>Character Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}  // Fix: update the name state here
            placeholder="Character Name"
          />
        </div>
        <div>
          <label>Alignment:</label>
          <input 
            type="text" 
            value={alignment} 
            onChange={(e) => setAlignment(e.target.value)} 
            placeholder="e.g., Lawful Good"
          />
        </div>
        <div>
          <label>Faith:</label>
          <input 
            type="text" 
            value={faith} 
            onChange={(e) => setFaith(e.target.value)} 
            placeholder="Deity or Religion"
          />
        </div>
        <div>
          <label>Lifestyle:</label>
          <input 
            type="text" 
            value={lifestyle} 
            onChange={(e) => setLifestyle(e.target.value)} 
            placeholder="e.g., Modest, Aristocratic"
          />
        </div>
        <button type="submit">Save Details</button>
      </form>
    </div>
  );
}
