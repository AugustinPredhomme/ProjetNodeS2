/*
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDebug extends Document {
  id: Types.ObjectId;
  timestamp: Date;
  message: string;
}

const debugSchema: Schema = new Schema({
  timestamp: { type: Date, required: true },
  message: { type: String, required: true },
});

export default mongoose.model<IDebug>('Debug', debugSchema);
*/

import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const debugs = pgTable('debug', {
    id: uuid('id').defaultRandom().primaryKey(),
    timestamp: timestamp('timestamp').notNull(),
    message: text('message').notNull(),
});
