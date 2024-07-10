import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IGuest extends Document {
  id: Types.ObjectId;
  name: string;
  email: string;
}

const guestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<IGuest>('Guest', guestSchema);
