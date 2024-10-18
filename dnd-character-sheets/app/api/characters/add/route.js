import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken'; // Assuming you're using JWT for token verification

const SECRET_KEY = process.env.JWT_SECRET; // Ensure you have your secret key in environment variables

// POST: Add a new character and link it to the user in the user_characters table
export async function POST(req) {
  // Get authorization header
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Authorization header is missing or malformed');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Extract the token
  const token = authHeader.split(' ')[1];
  let userId;

  // Verify the token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    userId = decoded.userId;
  } catch (error) {
    console.error('Invalid or expired token:', error);
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Insert a new character into the character table with default values
    const characterResult = await query(
      `INSERT INTO characters (created_at) VALUES (NOW()) RETURNING id as character_id`
    );

    if (characterResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to create character' }, { status: 500 });
    }

    const characterId = characterResult.rows[0].character_id;

    // Link the character to the user in the user_characters table
    const userCharacterResult = await query(
      `INSERT INTO user_characters (user_id, character_id) VALUES ($1, $2) RETURNING *`,
      [userId, characterId]
    );

    if (userCharacterResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to link character to user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Character created and linked successfully', character: { character_id: characterId } });
  } catch (error) {
    console.error('Error creating character and linking to user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
