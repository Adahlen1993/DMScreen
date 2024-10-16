import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch subclasses for a specific class
export async function GET(req, { params }) {
  const { characterId } = params;  // Use characterId from the URL slug
  const classId = new URL(req.url).searchParams.get('classId');  // Get classId from query params

  try {
    const result = await query(
      `SELECT id, subclass_name, description
       FROM subclasses
       WHERE class_id = $1`,
      [classId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No subclasses available' }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching subclasses:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
