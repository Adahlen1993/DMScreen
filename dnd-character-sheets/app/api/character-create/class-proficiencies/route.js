import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';  // Adjust based on your setup

// Handler for GET requests to fetch skill proficiencies
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get('class_id');

  if (!classId) {
    return NextResponse.json({ error: 'class_id is required' }, { status: 400 });
  }

  try {
    // Fetch only skill proficiencies for Barbarian
    const sqlQuery = `
      SELECT p.id, p.name
      FROM class_proficiencies cp
      JOIN proficiencies p ON cp.proficiency_id = p.id
      JOIN proficiency_types pt ON p.proficiency_type_id = pt.id
      WHERE cp.class_id = $1 AND pt.name = 'Skills' 
      AND p.name IN ('Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival')
    `;
    const result = await query(sqlQuery, [classId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'No skill proficiencies found for the selected class' }, { status: 404 });
    }

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching skill proficiencies:', error);
    return NextResponse.json({ error: 'Failed to fetch skill proficiencies' }, { status: 500 });
  }
}
