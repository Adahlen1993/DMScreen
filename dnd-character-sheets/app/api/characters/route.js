import { authenticate } from '../../lib/auth';
import { query } from '../../lib/db';

export async function POST(req) {
  const user = authenticate(req);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { character_name, class: characterClass, species, character_details, background, notes, inventory, spells, feats } = await req.json();

  try {
    const result = await query(
      `INSERT INTO characters 
        (user_id, character_name, class, species, character_details, background, notes, inventory, spells, feats)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
      [
        user.userId,  // Associate the character with the logged-in user
        character_name,
        characterClass,
        species,
        character_details,
        background,
        notes,
        inventory,
        spells,
        feats
      ]
    );

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error inserting character:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}



export async function GET(req) {
  const user = authenticate(req);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const result = await query(
      `SELECT * FROM characters WHERE user_id = $1 ORDER BY id DESC`,
      [user.userId]
    );

    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

