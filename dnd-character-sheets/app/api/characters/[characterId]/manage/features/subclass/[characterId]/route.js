import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET: Fetch subclass features based on subclassId and level
export async function GET(req, { params }) {
  const { characterId } = params; // Use characterId from the URL slug
  const url = new URL(req.url);
  const subclassId = url.searchParams.get('subclassId');  // Get subclassId from query params
  const level = url.searchParams.get('level');  // Get level from query params

  try {
    if (!subclassId || !level) {
      return NextResponse.json({ error: 'subclassId and level are required' }, { status: 400 });
    }

    // Query to fetch subclass features for the selected subclass and level
    const result = await query(
      `SELECT feature_name, description, modifier
       FROM subclass_features
       WHERE subclass_id = $1 AND level <= $2
       ORDER BY level ASC`,
      [subclassId, level]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: 'No features available' }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching subclass features:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
