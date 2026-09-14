import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import assert from 'node:assert'

config({quiet: true});
const db_url: string | undefined = process.env.DB_URL
assert(!Object.is(db_url, undefined), 'db_url is null')

export default defineConfig({
    out: './src/drizzle-migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: db_url
    },
    schema: './src/db/schema.ts'
})