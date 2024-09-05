/*import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReservation extends Document {
  id: Types.ObjectId;
  roomId: Types.ObjectId;
  guestId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
}

const reservationSchema: Schema = new Schema({
  roomId: { type: Types.ObjectId, ref: 'Room', required: true },
  guestId: { type: Types.ObjectId, ref: 'Guest', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

export default mongoose.model<IReservation>('Reservation', reservationSchema);
*/

import { date, integer, pgTable, uuid } from "drizzle-orm/pg-core";
import { guests } from './guestsSchema';
import { rooms } from './roomsSchema';

export const reservations = pgTable('reservations', {
    id: uuid('id').defaultRandom().primaryKey(),
    guestId: integer('guestId').references(() => guests.id),
    roomId: integer('roomId').references(() => rooms.id),
    startDate: date('startDate', { mode: "string" }).notNull(),
    endDate: date('endDate', { mode: "string" }).notNull()
});