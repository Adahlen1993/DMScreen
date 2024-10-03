import { NextResponse } from 'next/server';
import { query } from '@/lib/db';  // Assuming you have a database query setup in lib/db
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1];  // Extract the token from the Authorization header

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the JWT token and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Ensure you have JWT_SECRET set in your environment variables
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the character IDs associated with the user
    const charactersRes = await query(
      'SELECT character_id FROM user_characters WHERE user_id = $1',
      [userId]
    );

    const characters = charactersRes.rows;

    return NextResponse.json({ characters }, { status: 200 });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
