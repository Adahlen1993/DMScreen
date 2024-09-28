import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Adjust the path based on your setup

// Handler for GET requests to fetch class features
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get('class_id');
  const level = searchParams.get('level');

  if (!classId) {
    return NextResponse.json({ error: 'class_id is required' }, { status: 400 });
  }

  try {
    // Fetch class features based on class_id, optionally filtering by level
    const sqlQuery = `
      SELECT * FROM class_features 
      WHERE class_id = $1
      ${level ? 'AND level <= $2' : ''} 
      ORDER BY level ASC
    `;

    // If level is provided, use it in the query
    const params = level ? [classId, level] : [classId];
    const result = await query(sqlQuery, params);

    // Return the class features as JSON
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching class features:', error);
    return NextResponse.json({ error: 'Failed to fetch class features' }, { status: 500 });
  }
}
