/*import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGuest extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
  password: string,
  refreshToken: string
}

const guestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  refreshToken: { type: String }
});

export default mongoose.model<IGuest>('Guest', guestSchema);
*/

import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const guests = pgTable('guests', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    refreshToken: varchar('refresh_token', { length: 255 })
});