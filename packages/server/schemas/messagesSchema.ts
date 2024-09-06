import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { guests } from "./";

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    content: text('content').notNull(),
    author: uuid('author').references(() => guests.id, { onDelete: 'cascade' }).notNull(),
    date: timestamp('date').defaultNow().notNull()
});