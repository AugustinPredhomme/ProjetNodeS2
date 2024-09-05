import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const rooms = pgTable('rooms', {
    id: uuid('id').defaultRandom().primaryKey(),
    roomType: varchar('roomType', { length: 50 }).notNull(),
    capacity: integer('capacity').notNull(),
    amenities: varchar('ameneties', { length: 255, enum: ["wifi", "spa", "parking"] }).notNull()
});