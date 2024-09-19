import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../../../lib/db';

export async function POST(req) {
  const { login, password } = await req.json();

  try {
    // Check if the user exists by username or email
    const result = await query(
      `SELECT * FROM users WHERE username = $1 OR email = $2`,
      [login, login]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const user = result.rows[0];

    // Check if the password matches the hashed password
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
    }

    // Generate a JWT for the user
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    // Return the JWT and user info (excluding password)
    return new Response(JSON.stringify({ token, user: { username: user.username, email: user.email, isAdmin: user.is_admin } }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}