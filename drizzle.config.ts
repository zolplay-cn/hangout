import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config()

export default {
  schema: './db/schema.ts',
  driver: 'pg',
  out: './db/migrations',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL ?? '',
  },
} satisfies Config
