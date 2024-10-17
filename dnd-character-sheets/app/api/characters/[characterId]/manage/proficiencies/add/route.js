import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add proficiencies to the character_proficiencies table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { classId } = await req.json(); // Get classId from the request body

  if (!characterId || !classId) {
    return NextResponse.json({ error: 'Character ID and Class ID are required' }, { status: 400 });
  }

  try {
    // Fetch all proficiencies for the given class
    const proficienciesResult = await query(
      `SELECT proficiency_id FROM class_proficiencies WHERE class_id = $1`,
      [classId]
    );

    if (proficienciesResult.rowCount === 0) {
      return NextResponse.json({ error: 'No proficiencies found for the specified class' }, { status: 404 });
    }

    // Insert each proficiency into the character_proficiencies table for the given character
    const insertPromises = proficienciesResult.rows.map((proficiency) =>
      query(
        `INSERT INTO character_proficiencies (character_id, proficiency_id) VALUES ($1, $2)`,
        [characterId, proficiency.proficiency_id]
      )
    );

    await Promise.all(insertPromises);

    return NextResponse.json({ message: 'Proficiencies added successfully' });
  } catch (error) {
    console.error('Error adding proficiencies to character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
