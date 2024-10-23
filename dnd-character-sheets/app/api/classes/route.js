import { query } from '@/lib/db'; // Make sure the path to db file is correct





export async function GET() {
    try {
      const result = await query('SELECT * FROM classes');
      console.log('Classes Fetched from DB:', result.rows); // Add a log to check the DB result
      return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
      console.error('Error fetching classes:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  }
  