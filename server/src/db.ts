import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, "../src/.env") });
const pool:Pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD||'',
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl:false
});

export default pool;
