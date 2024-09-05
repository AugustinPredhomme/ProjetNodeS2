import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const guests = pgTable('guests', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    refreshToken: varchar('refresh_token', { length: 255 })
});