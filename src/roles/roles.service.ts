import { Injectable } from '@nestjs/common';
import {drizzle} from 'drizzle-orm/node-postgres'
import { roles_table } from '../db/schema';
import { eq } from 'drizzle-orm';

// is 'roles' a service ?
// because the 'roles' table is usually only read but not modified
// so it doesn't need to be injectable

/*
    R: Read     W:    Write
    D: Delete   none: no permission
*/

export enum Title {
    ADMIN    = 'admin',
    EMPLOYEE = 'employee',
    USER     = 'user'
}
export enum Permission {
    RWD  = 'RWD',
    RW   = 'RW',
    R    = 'R',
    NONE = 'none'
}
export interface Roles {
    title: Title,
    permission: Permission
}

type Role = [Title, Permission]
export const all_roles: Role[] = [
    [Title.ADMIN,    Permission.RWD],
    [Title.EMPLOYEE, Permission.RW],
    [Title.USER,     Permission.R],
]

type DBType = ReturnType<typeof drizzle>

@Injectable()
export class RolesService {
    async create_role(db: DBType, role: Role) {
        try {
            await db.insert(roles_table).values({title: role[0],
                permission: role[1]})
        } catch(err) {
            throw err
        }
    }

    async create_role_no_conflict(db: DBType, role: Role) {
        try {
            await db.insert(roles_table).values({title: role[0],
                permission: role[1]}).onConflictDoNothing()
        } catch(err) {
            throw err
        }
    }

    async delete_role(db: DBType, title: Title) {
        try {
            await db.delete(roles_table).where(eq(roles_table.title,
                title))
        } catch(err) {
            throw err
        }
    }
}
