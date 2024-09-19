import { query } from '../../../lib/db';

export async function POST(req) {
  const { name, characterClass, race, abilityScores, skills } = await req.json();

  try {
    const result = await query(
      `INSERT INTO characters 
        (name, class, race, strength, dexterity, constitution, intelligence, wisdom, charisma, skills)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
      [
        name,
        characterClass,
        race,
        abilityScores.Strength,
        abilityScores.Dexterity,
        abilityScores.Constitution,
        abilityScores.Intelligence,
        abilityScores.Wisdom,
        abilityScores.Charisma,
        skills,
      ]
    );
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error('Error inserting character:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


import { query } from '../../../lib/db';

export async function GET() {
  try {
    const result = await query(`SELECT * FROM characters ORDER BY id DESC`);
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching characters:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
