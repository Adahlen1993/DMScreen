import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add class features to the character_class_features table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { classId } = await req.json(); // Get classId from the request body

  if (!characterId || !classId) {
    return NextResponse.json({ error: 'Character ID and Class ID are required' }, { status: 400 });
  }

  try {
    // Fetch all class features for the given class
    const featuresResult = await query(
      `SELECT id, level FROM class_features WHERE class_id = $1`,
      [classId]
    );

    if (featuresResult.rowCount === 0) {
      return NextResponse.json({ error: 'No features found for the specified class' }, { status: 404 });
    }

    // Insert each feature into the character_class_features table for the given character
    const insertPromises = featuresResult.rows.map((feature) =>
      query(
        `INSERT INTO character_class_features (character_id, feature_id, level) VALUES ($1, $2, $3)`,
        [characterId, feature.id, feature.level]
      )
    );

    await Promise.all(insertPromises);

    return NextResponse.json({ message: 'Class features added successfully' });
  } catch (error) {
    console.error('Error adding class features to character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
