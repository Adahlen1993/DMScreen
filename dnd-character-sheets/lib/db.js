import { Pool } from 'pg';

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

export const query = (text, params) => pool.query(text, params);
