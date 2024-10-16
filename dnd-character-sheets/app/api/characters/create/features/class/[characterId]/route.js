import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch class features based on classId and level
export async function GET(req, { params }) {
  const { characterId } = params;  // This is for the route param, even if not used
  const url = new URL(req.url);
  const classId = url.searchParams.get('classId');  // Get classId from query params
  const level = url.searchParams.get('level');  // Get level from query params

  try {
    if (!classId || !level) {
      return NextResponse.json({ error: 'classId and level are required' }, { status: 400 });
    }

    // Query to fetch class features for the selected class and level
    const result = await query(
      `SELECT feature_name, description, modifier
       FROM class_features
       WHERE class_id = $1 AND level <= $2
       ORDER BY level ASC`,
      [classId, level]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No features available' }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching class features:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
