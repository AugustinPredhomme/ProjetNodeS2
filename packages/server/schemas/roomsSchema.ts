/*import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoom extends Document {
  id: Types.ObjectId;
  roomType: "Double"|"Simple";
  capacity: number;
  amenities: string[];
}

const roomSchema: Schema = new Schema({
  roomType: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], required: false },
});

export default mongoose.model<IRoom>('Room', roomSchema);
*/

import { integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const rooms = pgTable('rooms', {
    id: uuid('id').defaultRandom().primaryKey(),
    roomType: varchar('roomType', { length: 50 }).notNull(),
    capacity: integer('capacity').notNull(),
    amenities: varchar('ameneties', { length: 255, enum: ["wifi", "spa", "parking"] }).notNull()
});