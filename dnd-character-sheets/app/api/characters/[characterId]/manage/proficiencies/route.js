import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// POST: Add proficiencies to the character_proficiencies table
export async function POST(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { selectedValues, label } = await req.json(); // Get selectedValues and label from the request body

  if (!characterId || !selectedValues) {
    return NextResponse.json({ error: 'Character ID and Selected Values are required' }, { status: 400 });
  }

  try {
    // Loop through selectedValues to get proficiency IDs
    const proficiencyIds = [];
    for (const value of selectedValues) {
      const result = await query(
        `SELECT id FROM proficiencies WHERE name = $1`,
        [value]
      );

      if (result.rowCount > 0) {
        proficiencyIds.push(result.rows[0].id);
      } else {
        return NextResponse.json({ error: `Proficiency '${value}' not found` }, { status: 404 });
      }
    }

    // Insert new proficiencies for the character with label
    for (const proficiencyId of proficiencyIds) {
      await query(
        `INSERT INTO character_proficiencies (character_id, proficiency_id, label) VALUES ($1, $2, $3)`,
        [characterId, proficiencyId, label]
      );
    }

    return NextResponse.json({ message: 'Proficiency added successfully' });
  } catch (error) {
    console.error('Error managing proficiencies for character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// GET: Fetch proficiencies for the character
export async function GET(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters

  if (!characterId) {
    return NextResponse.json({ error: 'Character ID is required' }, { status: 400 });
  }

  try {
    const queryText = `
      SELECT p.*, cp.label FROM character_proficiencies cp
      JOIN proficiencies p ON cp.proficiency_id = p.id
      WHERE cp.character_id = $1
    `;
    const queryParams = [characterId];

    const proficienciesResult = await query(queryText, queryParams);

    if (proficienciesResult.rowCount === 0) {
      return NextResponse.json({ message: 'No proficiencies found for the specified character' }, { status: 404 });
    }

    return NextResponse.json({ proficiencies: proficienciesResult.rows });
  } catch (error) {
    console.error('Error fetching proficiencies for character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT: Update proficiencies for the character
export async function PUT(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters
  const { selectedValues, label } = await req.json(); // Get selectedValues and label from the request body

  if (!characterId || !selectedValues) {
    return NextResponse.json({ error: 'Character ID and Selected Values are required' }, { status: 400 });
  }

  try {
    // Delete existing proficiencies for the character
    await query(
      `DELETE FROM character_proficiencies WHERE character_id = $1`,
      [characterId]
    );

    // Loop through selectedValues to get proficiency IDs
    const proficiencyIds = [];
    for (const value of selectedValues) {
      const result = await query(
        `SELECT id FROM proficiencies WHERE name = $1`,
        [value]
      );

      if (result.rowCount > 0) {
        proficiencyIds.push(result.rows[0].id);
      } else {
        return NextResponse.json({ error: `Proficiency '${value}' not found` }, { status: 404 });
      }
    }

    // Insert updated proficiencies for the character with label
    for (const proficiencyId of proficiencyIds) {
      await query(
        `INSERT INTO character_proficiencies (character_id, proficiency_id, label) VALUES ($1, $2, $3)`,
        [characterId, proficiencyId, label]
      );
    }

    return NextResponse.json({ message: 'Proficiency updated successfully' });
  } catch (error) {
    console.error('Error updating proficiency for character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE: Remove proficiency from the character
export async function DELETE(req, { params }) {
  const { characterId } = params; // Get characterId from the route parameters

  if (!characterId) {
    return NextResponse.json({ error: 'Character ID is required' }, { status: 400 });
  }

  try {
    const result = await query(
      `DELETE FROM character_proficiencies WHERE character_id = $1`,
      [characterId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'No proficiency found to delete' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Proficiency deleted successfully' });
  } catch (error) {
    console.error('Error deleting proficiency for character:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
