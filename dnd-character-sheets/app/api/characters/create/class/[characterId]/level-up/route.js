import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Level up a class for the character
export async function POST(req, { params }) {
  const { characterId } = params;
  const { classId, newLevel } = await req.json();  // Get classId and new level from the request body

  try {
    // Update the level of the class in character_classes
    const result = await query(
      `UPDATE character_classes
       SET level = $1
       WHERE character_id = $2 AND class_id = $3
       RETURNING *`,
      [newLevel, characterId, classId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to level up' }, { status: 500 });
    }

    // Fetch updated class features after leveling up
    const featuresResult = await query(
      `SELECT feature_name, description, modifier
       FROM class_features
       WHERE class_id = $1 AND level <= $2
       ORDER BY level ASC`,
      [classId, newLevel]
    );

    return NextResponse.json({ success: true, characterClass: result.rows[0], features: featuresResult.rows });
  } catch (error) {
    console.error('Error leveling up class:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
