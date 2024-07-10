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
