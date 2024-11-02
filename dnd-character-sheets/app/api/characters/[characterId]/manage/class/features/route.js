import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Import your database query function

// GET: Fetch class features for a specific character class
export async function GET(req, { params }) {
  const { characterId } = params;
  const url = new URL(req.url);
  const classId = url.searchParams.get("classId");

  if (!characterId || !classId) {
    return NextResponse.json({ error: 'Character ID and Class ID are required' }, { status: 400 });
  }

  try {
    // Query to get class features for the character
    const result = await query(
      `
     SELECT cf.*
FROM character_class_features ccf
INNER JOIN class_features cf ON ccf.feature_id = cf.id
WHERE ccf.character_id = $1 AND ccf.class_id = $2
ORDER BY cf.level

      `,
      [characterId, classId]
    );

    if (result.rows.length > 0) {
      return NextResponse.json({ success: true, data: result.rows }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'No features found for this character class.' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching character class features:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
  