import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import env from './env.config.js';
import logger from '../logger/logger.js';

const pool = new Pool({ connectionString: env.DATABASE_URL });

let db;
try {
	db = drizzle(pool);
	logger.info('Drizzle DB client initialized');
} catch (err) {
	logger.error(`Failed to initialize DB: ${err?.message || err}`);
	throw err;
}

export { db, pool };
