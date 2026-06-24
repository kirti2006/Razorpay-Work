import { z } from 'zod';
import { pgTable, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';

const orgEmailSchema = z
	.string()
	.email()
	.refine((value) => value.endsWith('@org.com'), {
		message: 'Email must end with @org.com',
	});

export const registerSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: orgEmailSchema,
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
	email: orgEmailSchema,
	password: z.string().min(1, 'Password is required'),
});

export const users = pgTable('users', {
	id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
	name: varchar('name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	role: varchar('role', { length: 10 }).notNull().default('EMP'),
	created_at: timestamp('created_at').defaultNow(),
});

