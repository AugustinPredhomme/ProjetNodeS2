import { date, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { guests } from './guestsSchema';
import { rooms } from './roomsSchema';

export const reservations = pgTable('reservations', {
    id: uuid('id').defaultRandom().primaryKey(),
    guestId: integer('guestId').references(() => guests.id),
    roomId: integer('roomId').references(() => rooms.id),
    startDate: date('startDate', { mode: "string" }).defaultNow().notNull(),
    endDate: date('endDate', { mode: "string" }).notNull()
});