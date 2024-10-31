import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add a class to the character_classes table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { classId } = await req.json(); // Get classId from the request body

  console.log("Received characterId:", characterId);
  console.log("Received classId:", classId);

  if (!characterId || !classId) {
    return NextResponse.json({ error: 'Character ID and Class ID are required' }, { status: 400 });
  }

  try {
    // Insert class into character_classes table
    const result = await query(
      `INSERT INTO character_classes (character_id, class_id, level) VALUES ($1, $2, 1) RETURNING *`,
      [characterId, classId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to add class to character' }, { status: 500 });
    }

    const characterClass = result.rows[0];

    // Get all class features for the class
    const classFeatures = await query(
      `SELECT * FROM class_features WHERE class_id = $1`,
      [classId]
    );

    // Insert class features into character_class_features table
    for (const feature of classFeatures.rows) {
      await query(
        `INSERT INTO character_class_features (character_id, class_id, feature_id, level) VALUES ($1, $2, $3, $4)`,
        [characterId, classId, feature.id, feature.level]
      );
    }

    // Get all proficiencies for the class
    const classProficiencies = await query(
      `SELECT * FROM class_proficiencies WHERE class_id = $1 AND is_given = true`,
      [classId]
    );

    // Insert proficiencies into character_proficiencies table
    for (const proficiency of classProficiencies.rows) {
      await query(
        `INSERT INTO character_proficiencies (character_id, proficiency_id) VALUES ($1, $2)`,
        [characterId, proficiency.proficiency_id]
      );
    }

    return NextResponse.json({ message: 'Class, features, and proficiencies added successfully', characterClass });
  } catch (error) {
    console.error('Error adding class to character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
