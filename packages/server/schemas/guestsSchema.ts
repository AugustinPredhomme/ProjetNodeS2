import mongoose, { Schema, Document, Types } from 'mongoose';

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
