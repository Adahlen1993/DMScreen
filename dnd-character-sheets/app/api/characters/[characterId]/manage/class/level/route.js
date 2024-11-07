// src/pages/api/characters/[characterId]/manage/class/level/route.js

import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Import your database query function

// PUT: Update the level for a specific character class
export async function PUT(req, { params }) {
  const { characterId } = params;
  const { classId, level } = await req.json();

  if (!characterId || !classId || !level) {
    return NextResponse.json({ error: 'Character ID, Class ID, and level are required' }, { status: 400 });
  }

  try {
    // Query to update character class level
    const result = await query(
      `
      UPDATE character_classes
      SET level = $1
      WHERE character_id = $2 AND class_id = $3
      RETURNING *;
      `,
      [level, characterId, classId]
    );

    if (result.rowCount > 0) {
      return NextResponse.json({ success: true, data: result.rows[0] }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Character or class not found.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to update character class level:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
