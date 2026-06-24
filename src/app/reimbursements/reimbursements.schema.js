import { pgTable, varchar, text, timestamp, numeric } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';

export const reimbursements = pgTable('reimbursements', {
	id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
	title: varchar('title', { length: 255 }).notNull(),
	description: text('description').notNull(),
	amount: numeric('amount').notNull(),
	status: varchar('status', { length: 32 }).notNull().default('PENDING'),
	created_by: varchar('created_by', { length: 255 }).notNull(),
	created_at: timestamp('created_at').defaultNow(),
});
