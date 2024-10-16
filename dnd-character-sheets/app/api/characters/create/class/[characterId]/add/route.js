import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add a class to the character
export async function POST(req, { params }) {
  const { characterId } = params;
  const { classId, level } = await req.json(); // Get classId and level from the request body

  try {
    // Insert the selected class into the character_classes table
    const result = await query(
      `INSERT INTO character_classes (character_id, class_id, level)
       VALUES ($1, $2, $3) RETURNING *`,
      [characterId, classId, level]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add class to character' }, { status: 500 });
    }

    return NextResponse.json({ success: true, characterClass: result.rows[0] });
  } catch (error) {
    console.error('Error adding class to character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
