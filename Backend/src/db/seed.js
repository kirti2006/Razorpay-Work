import bcrypt from 'bcrypt';
import '../config/env.config.js';
import { eq } from 'drizzle-orm';
import { db, pool } from '../config/db.config.js';
import { users } from '../app/onboardings/onboardings.schema.js';
import logger from '../logger/logger.js';

import { employee_assignments } from '../app/employees/employees.schema.js';

const seedCFO = async () => {
  try {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    
    // Seed CFO
    let cfo = await db.select({ id: users.id }).from(users).where(eq(users.email, 'cfo@org.com')).limit(1);
    if (!cfo.length) {
      const hashedCFO = await bcrypt.hash('CFO#ORG@April2026', saltRounds);
      cfo = await db.insert(users).values({ name: 'CFO User', email: 'cfo@org.com', password: hashedCFO, role: 'CFO' }).returning({ id: users.id });
      logger.info('CFO account seeded');
    }

    // Seed APE
    let ape = await db.select({ id: users.id }).from(users).where(eq(users.email, 'ape@org.com')).limit(1);
    if (!ape.length) {
      const hashedAPE = await bcrypt.hash('APE#ORG@April2026', saltRounds);
      ape = await db.insert(users).values({ name: 'Accounts Payable', email: 'ape@org.com', password: hashedAPE, role: 'APE' }).returning({ id: users.id });
      logger.info('APE account seeded');
    }

    // Seed Manager (RM)
    let rm = await db.select({ id: users.id }).from(users).where(eq(users.email, 'manager@org.com')).limit(1);
    if (!rm.length) {
      const hashedRM = await bcrypt.hash('RM#ORG@April2026', saltRounds);
      rm = await db.insert(users).values({ name: 'Reporting Manager', email: 'manager@org.com', password: hashedRM, role: 'RM' }).returning({ id: users.id });
      logger.info('Manager account seeded');
    }

    // Seed Employee (EMP)
    let emp = await db.select({ id: users.id }).from(users).where(eq(users.email, 'employee@org.com')).limit(1);
    if (!emp.length) {
      const hashedEMP = await bcrypt.hash('EMP#ORG@April2026', saltRounds);
      emp = await db.insert(users).values({ name: 'Test Employee', email: 'employee@org.com', password: hashedEMP, role: 'EMP' }).returning({ id: users.id });
      logger.info('Employee account seeded');
    }

    // Assign EMP to RM
    if (emp.length && rm.length) {
      const existingAssignment = await db.select().from(employee_assignments).where(eq(employee_assignments.employee_id, emp[0].id)).limit(1);
      if (!existingAssignment.length) {
        await db.insert(employee_assignments).values({ employee_id: emp[0].id, manager_id: rm[0].id });
        logger.info('Employee assigned to Manager');
      }
    }

    logger.info('All accounts seeded successfully');
  } catch (err) {
    logger.error(`Failed to seed accounts: ${err?.message || err}`);
    throw err;
  } finally {
    await pool.end();
  }
};

seedCFO().catch((err) => {
  logger.error(`Seed failed: ${err?.message || err}`);
  process.exit(1);
});
