import { Types } from 'mongoose';
import Reservation, { IReservation } from '../schemas/reservationsSchema';

export const findAllReservations = async (): Promise<IReservation[]> => {
  try {
    return Reservation.find().populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const findReservationById = async (reservationId: Types.ObjectId): Promise<IReservation | null> => {
  try {
    return Reservation.findById(reservationId).populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createReservation = async (reservation: Partial<IReservation>): Promise<IReservation | null> => {
  try {
    return Reservation.create(reservation);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateReservation = async (reservationId: Types.ObjectId, updateData: Partial<IReservation>): Promise<IReservation | null> => {
  try {
    return Reservation.findByIdAndUpdate(reservationId, updateData, { new: true }).populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteReservation = async (reservationId: Types.ObjectId): Promise<boolean> => {
  try {
    await Reservation.findByIdAndDelete(reservationId).exec();
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
