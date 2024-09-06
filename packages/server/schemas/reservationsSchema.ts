import { date, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { guests } from './guestsSchema';
import { rooms } from './roomsSchema';

export const reservations = pgTable('reservations', {
    id: uuid('id').defaultRandom().primaryKey(),
    guestId: uuid('guestId').references(() => guests.id),
    roomId: uuid('roomId').references(() => rooms.id),
    startDate: date('startDate', { mode: "string" }).defaultNow().notNull(),
    endDate: date('endDate', { mode: "string" }).notNull()
});