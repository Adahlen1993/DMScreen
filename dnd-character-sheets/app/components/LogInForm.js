import { useState } from 'react';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);  // Store the JWT in localStorage
      console.log('Login successful:', data.user);
    } else {
      const errorData = await res.json();
      setError(errorData.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username or Email:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
