import { query } from '@/lib/db';

export async function GET(req, { params }) {
    const { classId } = params;
    const { searchParams } = new URL(req.url);
    const includeFeatures = searchParams.get('includeFeatures') === 'true';

    try {
        // Fetch the class details
        const classResult = await query('SELECT * FROM classes WHERE id = $1', [classId]);
        if (classResult.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Class not found' }), { status: 404 });
        }

        const classData = classResult.rows[0];

        // If includeFeatures is true, fetch the class features as well
        if (includeFeatures) {
            const featuresResult = await query('SELECT * FROM class_features WHERE class_id = $1 ORDER BY level', [classId]);
            classData.features = featuresResult.rows;
        }

        return new Response(JSON.stringify(classData), { status: 200 });
    } catch (error) {
        console.error('Error fetching class details:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
