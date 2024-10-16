import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add subclass to the character's class
export async function POST(req, { params }) {
  const { characterId } = params; // Use characterId from the route params
  const { classId, subclassId } = await req.json(); // Expect classId and subclassId from request body

  try {
    // Update the character_classes table to add the subclass
    const result = await query(
      `UPDATE character_classes
       SET subclass_id = $1
       WHERE character_id = $2 AND class_id = $3
       RETURNING *`,
      [subclassId, characterId, classId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add subclass' }, { status: 500 });
    }

    // Fetch the selected subclass details to return to the frontend
    const subclassResult = await query(
      `SELECT id, subclass_name, description
       FROM subclasses
       WHERE id = $1`,
      [subclassId]
    );

    return NextResponse.json({ success: true, subclass: subclassResult.rows[0] });
  } catch (error) {
    console.error('Error adding subclass:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
