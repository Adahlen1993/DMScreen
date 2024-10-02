import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';  // Assuming you have a PostgreSQL pool set up

export async function POST(req) {
  try {
    const { userId, character_name } = await req.json();
    
    // Insert new character into the characters table
    const characterRes = await pool.query(
      `INSERT INTO characters (created_at, updated_at) 
       VALUES (NOW(), NOW()) 
       RETURNING id`
    );
    
    const characterId = characterRes.rows[0].id;

    // Insert into user_characters table to link the character with the user
    await pool.query(
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
