import { NextResponse } from 'next/server';
import { query } from '@/lib/db';  // Import the query function

export async function POST(req) {
  try {
    const { userId } = await req.json();

    // Insert a new character into the characters table
    const characterRes = await query(
      `INSERT INTO characters (created_at, updated_at) 
       VALUES (NOW(), NOW()) 
       RETURNING id`
    );

    const characterId = characterRes.rows[0].id;

    // Link the new character with the user in user_characters table
    await query(
      `INSERT INTO user_characters (user_id, character_id, created_at) 
       VALUES ($1, $2, NOW())`,
      [userId, characterId]
    );

    return NextResponse.json({ character_id: characterId }, { status: 201 });
  } catch (error) {
    console.error('Error creating character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
