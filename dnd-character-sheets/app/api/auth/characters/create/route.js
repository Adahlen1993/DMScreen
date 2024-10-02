import { NextResponse } from 'next/server';
import { query } from '@/lib/db';  // Make sure the correct pool is imported

export async function POST(req) {
  try {
    const { userId } = await req.json();

    // Insert new character into the characters table
    const characterRes = await query(
      `INSERT INTO characters (created_at, updated_at) 
       VALUES (NOW(), NOW()) 
       RETURNING id`
    );
    
    const characterId = characterRes.rows[0].id;

    // Insert into user_characters table to link the character with the user
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
