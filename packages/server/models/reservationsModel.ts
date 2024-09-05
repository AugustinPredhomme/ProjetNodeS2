/*
import { Types } from 'mongoose';
import Reservation, { IReservation } from '../schemas/reservationsSchema';
import logger from '../utils/logger';

export const findAllReservations = async (): Promise<IReservation[]> => {
  try {
    logger.info(`[RESERVATION] Récupération réalisée avec succès`);
    return Reservation.find().populate([
      { path: 'reservationId', select: 'reservationType capacity' },
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
      { path: 'reservationId', select: 'reservationType capacity' },
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
      { path: 'reservationId', select: 'reservationType capacity' },
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
*/

import { eq } from "drizzle-orm";

import { db } from "../config/pool";

import {reservations } from "../schemas/";
import logger from "../utils/logger";
import { Reservation, NewReservation } from "../entities/reservation";

export const findAllReservations = (): Promise <Partial<Reservation>[]> => {
  try {
    logger.info(`[RESERVATION] Récupération réalisée avec succès`);
    return db.query.reservations.findMany({
      columns: {
        id: true,
        guestId: true,
        roomId: true,
        startDate: true,
        endDate: true
      }
    });
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la récupération des réservations: ${err.message}`);
    throw new Error("Impossible de récupérer les réservations");
  }
}

export const findReservationById = (id: string) => {
  try {
    logger.info(`[RESERVATION] Récupération par ID réalisée avec succès`);
    return db.select({
      id: reservations.id,
      guestId: reservations.guestId,
      roomsId: reservations.roomId,
      startDate: reservations.startDate,
      endDate: reservations.endDate
    }).from (reservations)
    .where(eq(reservations.id, id))
    .execute()
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la récupération de la réservation [${id}]: ${err.message}`);
    throw new Error(`Impossible de récupérer la réservation`);
  }
}

export const createReservation = (reservation: NewReservation) => {
  try {
    logger.info(`[RESERVATION] Création réalisée avec succès`);
    return db.insert(reservations).values(reservation).execute();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la création de la réservation [${reservation.id}]: ${err.message}`);
    throw new Error(`Impossible de créer la réservation`);
  }
}

export const updateReservation = (reservation: Reservation) => {
  try {
    return db.update(reservations).set(reservation).where(
      eq(reservations.id, reservation.id)
    ).execute();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la mise à jour de la réservation [${reservation.id}]: ${err.message}`);
    throw new Error(`Impossible de mettre à jour la réservation`);
  }
}

export const deleteReservation = (id: string) => {
  try {
    logger.info(`[RESERVATION] Suppression réalisée avec succès`);
    return db.delete(reservations).where(
        eq(reservations.id, id)
      )
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la suppression de la réservation [${id}]: ${err.message}`);
    throw new Error(`Impossible de supprimer la réservation`);
  }
}