import * as schema from '@/db/schema';
import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString as string);
export const db = drizzle(client, { schema });
