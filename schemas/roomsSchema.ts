import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRoom extends Document {
  id: Types.ObjectId;
  roomType: string;
  capacity: number;
  amenities: string[];
}

const roomSchema: Schema = new Schema({
  roomType: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: { type: [String], required: false },
});

export default mongoose.model<IRoom>('Room', roomSchema);
