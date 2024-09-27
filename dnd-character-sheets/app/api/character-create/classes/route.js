import { NextResponse } from 'next/server';
import { query } from '../../../lib/db'; // Use named import

// Handler for GET requests to fetch class data
export async function GET() {
  try {
    // Fetch the classes data
    const classes = await query('SELECT * FROM classes');
    
    // Return the classes as JSON
    return NextResponse.json(classes.rows);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}
