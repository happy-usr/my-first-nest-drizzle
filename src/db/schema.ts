import { integer, varchar, pgTable, boolean } from "drizzle-orm/pg-core";

export const users_table = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    surname: varchar().notNull(),
    deleted: boolean().notNull()
})