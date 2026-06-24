import bcrypt from 'bcrypt';
import { pool } from '../config/db.config.js';
import logger from '../logger/logger.js';
import env from '../config/env.config.js';

const seedCFO = async () => {
  const email = 'cfo@org.com';
  try {
    const { rows } = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (rows.length) {
      logger.info('CFO account already exists; skipping seed');
      return;
    }

    const hashed = await bcrypt.hash('CFO#ORG@April2026', env.BCRYPT_SALT_ROUNDS || 10);
    await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES (gen_random_uuid(), $1, $2, $3, $4)',
      ['CFO User', email, hashed, 'CFO']
    );
    logger.info('CFO account seeded successfully');
  } catch (err) {
    logger.error(`Failed to seed CFO account: ${err?.message || err}`);
    throw err;
  } finally {
    await pool.end();
  }
};

seedCFO().catch((err) => {
  logger.error(`Seed failed: ${err?.message || err}`);
  process.exit(1);
});
