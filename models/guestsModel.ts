import { Types } from 'mongoose';
import Guest, { IGuest } from '../schemas/guestsSchema';

export const findAllGuests = async (): Promise<IGuest[]> => {
  try {
    return Guest.find().exec();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findGuestById = async (guestId: Types.ObjectId): Promise<IGuest | null> => {
  try {
    return Guest.findById(guestId).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createGuest = async (guest: Partial<IGuest>): Promise<IGuest | null> => {
  try {
    return Guest.create(guest);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateGuest = async (guestId: Types.ObjectId, updateData: Partial<IGuest>): Promise<IGuest | null> => {
  try {
    return Guest.findByIdAndUpdate(guestId, updateData, { new: true }).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteGuest = async (guestId: Types.ObjectId): Promise<boolean> => {
  try {
    await Guest.findByIdAndDelete(guestId).exec();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
