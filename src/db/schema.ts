import { integer, varchar, pgTable, boolean,
    pgEnum
 } from "drizzle-orm/pg-core";
import { Permission, Title } from "../roles/roles.service";

export const role_title = pgEnum('title', 
    [Title.ADMIN, Title.EMPLOYEE, Title.USER])
export const role_permission = pgEnum('permission', 
    [Permission.RWD, Permission.RW, Permission.R, Permission.NONE])
export const roles_table = pgTable('roles', {
    title: role_title().primaryKey(),
    permission: role_permission().notNull()
})

export const users_table = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: role_title().references(() => roles_table.title).notNull(),
    name: varchar().notNull(),
    surname: varchar().notNull(),
    deleted: boolean().notNull()
})