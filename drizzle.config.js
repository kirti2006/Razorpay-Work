import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: [
    './src/app/onboardings/onboardings.schema.js',
    './src/app/employees/employees.schema.js',
    './src/app/reimbursements/reimbursements.schema.js',
    './src/app/approvals/approvals.schema.js',
  ],
  out: './migrations',
  driver: 'pg',
});
