import { Types } from 'mongoose';
import Reservation, { IReservation } from '../schemas/reservationsSchema';
import logger from '../utils/logger';

export const findAllReservations = async (): Promise<IReservation[]> => {
  try {
    logger.info(`[RESERVATION] Récupération réalisée avec succès`);
    return Reservation.find().populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la récupération: ${err.message}`);
    return [];
  }
};

export const findReservationById = async (reservationId: Types.ObjectId): Promise<IReservation | null> => {
  try {
    logger.info(`[RESERVATION] Récupération par ID réalisée avec succès`);
    return Reservation.findById(reservationId).populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la récupération par ID: ${err.message}`);
    return null;
  }
};

export const createReservation = async (reservation: Partial<IReservation>): Promise<IReservation | null> => {
  try {
    logger.info(`[RESERVATION] Création réalisée avec succès`);
    return Reservation.create(reservation);
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la création: ${err.message}`);
    return null;
  }
};

export const updateReservation = async (reservationId: Types.ObjectId, updateData: Partial<IReservation>): Promise<IReservation | null> => {
  try {
    logger.info(`[RESERVATION] mise à jour réalisée avec succès`);
    return Reservation.findByIdAndUpdate(reservationId, updateData, { new: true }).populate([
      { path: 'roomId', select: 'roomType capacity' },
      { path: 'guestId', select: 'name email' },
    ]).exec();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la mise à jour: ${err.message}`);
    return null;
  }
};

export const deleteReservation = async (reservationId: Types.ObjectId): Promise<boolean> => {
  try {
    logger.info(`[RESERVATION] Suppression réalisée avec succès`);
    await Reservation.findByIdAndDelete(reservationId).exec();
    return true;
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la suppression: ${err.message}`);
    return false;
  }
};
