import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config();

const config = {
	schema: './src/db/schema.ts',
	driver: 'pg',
	out: './drizzle',
	breakpoints: true,
	verbose: true,
	dbCredentials: {
		connectionString: process.env.DATABASE_URL as string
	}
} satisfies Config;

export default config;
