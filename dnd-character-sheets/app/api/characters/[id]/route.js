import { authenticate } from '../../../lib/auth';
import { query } from '../../../lib/db';

export async function GET(req, { params }) {
  const user = authenticate(req);

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { id } = params;  // Get the character ID from the route params

  try {
    const result = await query(
      `SELECT * FROM characters WHERE id = $1 AND user_id = $2`,
      [id, user.userId]
    );

    if (result.rows.length === 0) {
      return new Response('Character not found', { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error('Error fetching character details:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
