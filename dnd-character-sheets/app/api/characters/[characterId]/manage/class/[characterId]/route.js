import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch available classes for character creation
export async function GET(req, { params }) {
  const { characterId } = params;

  try {
    // Query the database to fetch available classes, use the correct field names
    const result = await query(
      `SELECT id, class_name AS name, description 
       FROM classes 
       ORDER BY class_name ASC`
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'No classes available' }, { status: 404 });
    }

    const availableClasses = result.rows;
    return NextResponse.json(availableClasses);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
