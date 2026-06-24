import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';

export const approvals = pgTable('approvals', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  reimbursement_id: varchar('reimbursement_id', { length: 255 }).notNull(),
  approver_id: varchar('approver_id', { length: 255 }).notNull(),
  approval_type: varchar('approval_type', { length: 10 }).notNull(),
  status: varchar('status', { length: 16 }).notNull(),
  approved_at: timestamp('approved_at').defaultNow(),
});
