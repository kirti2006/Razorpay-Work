import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';

export const users = pgTable('users', {
	id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	role: varchar('role', { length: 10 }).notNull().default('EMP'),
	created_at: timestamp('created_at').defaultNow(),
});
