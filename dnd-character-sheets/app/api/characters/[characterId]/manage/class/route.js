import { query } from '@/lib/db'; // Adjust the import to your DB utility path

export async function GET(req, { params }) {
  const { characterId } = params;

  try {
    // Query to check if the character has chosen a class
    const result = await query(
      `
        SELECT cc.id, cc.class_id, c.class_name, c.description, cc.level, cc.created_at, cc.updated_at
        FROM character_classes cc
        INNER JOIN classes c ON cc.class_id = c.id
        WHERE cc.character_id = $1
      `,
      [characterId]
    );

    if (result.rows.length > 0) {
      // Character has a class assigned
      return new Response(JSON.stringify({ success: true, data: result.rows }), { status: 200 });
    } else {
      // Character does not have a class assigned
      return new Response(JSON.stringify({ success: false, message: 'No class assigned to this character.' }), { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching character class:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { status: 500 });
  }
}

export async function POST(req, { params }) {
  const { characterId } = params;
  const body = await req.json();
  const { classId, level } = body;

  try {
    // Insert a new class for the character
    const result = await query(
      `
        INSERT INTO character_classes (character_id, class_id, level)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [characterId, classId, level]
    );

    return new Response(JSON.stringify({ success: true, data: result.rows[0] }), { status: 201 });
  } catch (error) {
    console.error('Error adding class to character:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { characterId } = params;
  const body = await req.json();
  const { classId } = body;

  try {
    // Delete the class for the character
    await query(
      `
        DELETE FROM character_classes
        WHERE character_id = $1 AND class_id = $2
      `,
      [characterId, classId]
    );

    return new Response(JSON.stringify({ success: true, message: 'Class removed from character.' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting character class:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { status: 500 });
  }
}
