import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const debugs = pgTable('debug', {
    id: uuid('id').defaultRandom().primaryKey(),
    timestamp: timestamp('timestamp').notNull(),
    message: text('message').notNull(),
});
