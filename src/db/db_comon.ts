import {config} from 'dotenv'
import {drizzle} from 'drizzle-orm/node-postgres'
config({
    quiet: true,
    //path: '/home/sahand/Programming/temp/nest_1/.env'
})
const db_url = process.env.DB_URL
if(!db_url) {
    throw new Error('db_url is null')
}

export function make_db_default() {
    const db = drizzle(db_url)
    return db
}
