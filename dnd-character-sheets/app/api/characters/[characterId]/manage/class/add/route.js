import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add a class to the character_classes table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { classId } = await req.json(); // Get classId from the request body

  if (!characterId || !classId) {
    return NextResponse.json({ error: 'Character ID and Class ID are required' }, { status: 400 });
  }

  try {
    const result = await query(
      `INSERT INTO character_classes (character_id, class_id, level) VALUES ($1, $2, 1) RETURNING *`,
      [characterId, classId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add class to character' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Class added successfully', characterClass: result.rows[0] });
  } catch (error) {
    console.error('Error adding class to character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
