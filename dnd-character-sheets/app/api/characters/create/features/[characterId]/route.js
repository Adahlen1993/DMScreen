import { query } from '@/lib/db';

export async function POST(req, { params }) {
    const { characterId } = params;
    const { features } = await req.json();

    try {
        const values = features.map((feature) => {
            return `('${characterId}', '${feature.id}', '${feature.name}', '${feature.description}')`;
        }).join(',');

        const result = await query(
            `INSERT INTO character_class_features (character_id, feature_id, feature_name, description) VALUES ${values} RETURNING *`
        );

        return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (error) {
        console.error('Error inserting character class features:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
