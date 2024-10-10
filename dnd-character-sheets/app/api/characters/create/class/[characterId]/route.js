import { query } from '@/lib/db';

export async function POST(req, { params }) {
    const { characterId } = params;
    const { class_id } = await req.json();

    try {
        const result = await query(
            'INSERT INTO character_classes (character_id, class_id) VALUES ($1, $2) RETURNING *',
            [characterId, class_id]
        );
        return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    } catch (error) {
        console.error('Error inserting character class:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}