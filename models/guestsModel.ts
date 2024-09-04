import { Types } from 'mongoose';
import Guest, { IGuest } from '../schemas/guestsSchema';
import logger from '../utils/logger';

export const findAllGuests = async (): Promise<IGuest[]> => {
  try {
    logger.info(`[GUEST] Récupération réalisée avec succès`);
    return Guest.find().select('name email').exec();
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la récupération: ${err.message}`);
    return [];
  }
};

export const findGuestById = async (guestId: Types.ObjectId): Promise<{guest : IGuest} | null> => {
  try {
    logger.info(`[GUEST] Récupération par ID réalisée avec succès`);
    const guest = await Guest.findById(guestId).select('name email').exec();
    if (!guest)
      return null;
    return { guest: guest.toObject() }
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la récupération par ID: ${err.message}`);
    return null;
  }
};

export const createGuest = async (guest: Partial<IGuest>): Promise<IGuest | null> => {
  try {
    logger.info(`[GUEST] Création réalisée avec succès`);
    return Guest.create(guest);
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la création: ${err.message}`);
    return null;
  }
};

export const updateGuest = async (guestId: Types.ObjectId, updateData: Partial<IGuest>): Promise<IGuest | null> => {
  try {
    logger.info(`[GUEST] Mise à jour réalisée avec succès`);
    return Guest.findByIdAndUpdate(guestId, updateData, { new: true }).exec();
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la mise à jour: ${err.message}`);
    return null;
  }
};

export const deleteGuest = async (guestId: Types.ObjectId): Promise<boolean> => {
  try {
    logger.info(`[GUEST] Suppression réalisée avec succès`);
    await Guest.findByIdAndDelete(guestId).exec();
    return true;
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la suppression: ${err.message}`);
    return false;
  }
};

export const findByCredentials = async (email: string): Promise<any> => {
  try {
      return Guest.findOne({ email }).select('password').exec();
  } catch (err) {
      console.error(err);
      return null
  } 
}
