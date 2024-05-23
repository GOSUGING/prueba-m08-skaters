import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.URI_POSTGREs;

export const pool = new Pool({
    allowExitOnIdle: true,
    connectionString
});

try {
    await pool.query('SELECT NOW()');
    console.log('DB Connection established!');
}catch(error){
    console.error(error);
}