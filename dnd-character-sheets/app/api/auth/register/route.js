import bcrypt from 'bcrypt';
import { query } from '../../../lib/db';

export async function POST(req) {
  const { username, email, password, firstName, lastName, dateOfBirth, isAdmin } = await req.json();

  try {
    // Check if username or email is already taken
    const existingUser = await query(
      `SELECT * FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'Username or email already exists' }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await query(
      `INSERT INTO users (username, email, password, first_name, last_name, date_of_birth, is_admin)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, username, email, first_name, last_name, date_of_birth, is_admin, created_at`,
      [username, email, hashedPassword, firstName, lastName, dateOfBirth, isAdmin || false]
    );

    // Return the user info (excluding password)
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
