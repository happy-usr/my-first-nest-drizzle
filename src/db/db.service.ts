import { Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { count } from 'drizzle-orm'
import { users_table } from './schema';
import { eq } from 'drizzle-orm';

type DBType = ReturnType<typeof drizzle>

@Injectable()
export class DbService {
    async get_user_by_id(db: DBType, id: number) {
        try {
            const u = await db.select({
                name: users_table.name,
                surname: users_table.surname,
                deleted: users_table.deleted
            }).from(users_table)
            .where(eq(users_table.id, id))

            let res = {name: '', surname: ''}
            if(u.length) {
                if(!u[0].deleted) {
                    res.name = u[0].name
                    res.surname = u[0].surname
                }
            }
            return res
        } catch(err) {
            throw err
        }
    }

    async get_users_count(db: DBType): Promise<number> {
        try {
            const n = await db.select({ count: count() }).from(users_table)
            .where(eq(users_table.deleted, false))
            return n[0].count
        } catch(err) {
            throw err
        }
    }

    async update_username_by_id(db: DBType, id: number, new_name: string) {
        try {
            await db.update(users_table).set({ name: new_name })
            .where(eq(users_table.id, id))
            // throw if user is deleted or id is invalid
        } catch(err) {
            throw err
        }
    }

    private async soft_delete_by_id(db: DBType, id: number) {
        try {
            await db.update(users_table).set({ deleted: true })
            .where(eq(users_table.id, id))
        } catch(err) {
            throw err
        }
    }

    async delete_user_by_id(db: DBType, id: number) {
        try {
            await this.soft_delete_by_id(db, id)
        } catch(err) {
            throw err
        }
    }

    async create_user(db: DBType, _name: string, _sname: string) {
        try {
            const u = {
                name: _name,
                surname: _sname,
                deleted: false
            }
            await db.insert(users_table).values(u)
        } catch(err) {
            throw err
        }
    }
}
