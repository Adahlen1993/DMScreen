import { query } from '@/lib/db';

export async function POST(req, { params }) {
    const { characterId } = params;
    const { selected_proficiencies } = await req.json();

    try {
        const values = selected_proficiencies.map((proficiency) => {
            return `('${characterId}', '${proficiency}')`;
        }).join(',');

        const result = await query(
            `INSERT INTO character_proficiencies (character_id, proficiency_id) VALUES ${values} RETURNING *`
        );

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error inserting character proficiencies:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
