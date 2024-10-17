import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add a new character and link it to the user in the user_characters table
export async function POST(req) {
  const { userId, characterName } = await req.json(); // Get userId and characterName from the request body

  if (!userId || !characterName) {
    return NextResponse.json({ error: 'User ID and Character Name are required' }, { status: 400 });
  }

  try {
    // Insert a new character into the character table
    const characterResult = await query(
      `INSERT INTO characters (name) VALUES ($1) RETURNING *`,
      [characterName]
    );

    if (characterResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to create character' }, { status: 500 });
    }

    const characterId = characterResult.rows[0].id;

    // Link the character to the user in the user_characters table
    const userCharacterResult = await query(
      `INSERT INTO user_characters (user_id, character_id) VALUES ($1, $2) RETURNING *`,
      [userId, characterId]
    );

    if (userCharacterResult.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to link character to user' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Character created and linked successfully', character: characterResult.rows[0] });
  } catch (error) {
    console.error('Error creating character and linking to user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
