import 'dotenv/config'

import { defineConfig } from 'drizzle-kit';

import { env } from './env';
const { DATABASE_URL } = env;

export default defineConfig({
    schema: 'schemas/index.ts',
    out: 'migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: DATABASE_URL
    },
    verbose: true,
    strict: true
});