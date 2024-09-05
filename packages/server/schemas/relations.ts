import { relations } from "drizzle-orm";
import { guests } from "./guestsSchema";
import { rooms } from './roomsSchema';
import { reservations } from './reservationsSchema';

export const guestsRelations = relations(guests, ({ many }) => ({
    rooms: many(rooms),
    reservations: many(reservations)
}))

/*
export const roomsRelations = relations(rooms, ({ one }) => ({

}))
*/

export const reservationsRelations = relations(reservations, ({ one }) => ({
    rooms: one(rooms, {
        fields: [reservations.roomId],
        references: [rooms.id]
    }),
    guests: one(guests, {
        fields: [reservations.guestId],
        references: [guests.id]
    })
}))