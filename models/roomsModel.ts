import { Types } from 'mongoose';
import Room, { IRoom } from '../schemas/roomsSchema';

export const findAllRooms = async (): Promise<IRoom[]> => {
  try {
    return Room.find().exec();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findRoomById = async (roomId: Types.ObjectId): Promise<IRoom | null> => {
  try {
    return Room.findById(roomId).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createRoom = async (room: Partial<IRoom>): Promise<IRoom | null> => {
  try {
    return Room.create(room);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateRoom = async (roomId: Types.ObjectId, updateData: Partial<IRoom>): Promise<IRoom | null> => {
  try {
    return Room.findByIdAndUpdate(roomId, updateData, { new: true }).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteRoom = async (roomId: Types.ObjectId): Promise<boolean> => {
  try {
    await Room.findByIdAndDelete(roomId).exec();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
