import { query } from '@/lib/db';

export async function GET() {
    try {
        const result = await query('SELECT id, class_name, description FROM classes');
        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error fetching classes:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
