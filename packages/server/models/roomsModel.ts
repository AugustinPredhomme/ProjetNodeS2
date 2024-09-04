import { Types } from 'mongoose';
import Room, { IRoom } from '../schemas/roomsSchema';
import logger from '../utils/logger';

export const findAllRooms = async (): Promise<IRoom[]> => {
  try {
    logger.info(`[ROOM] Récupération réalisée avec succès`);
    return Room.find().exec();
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la récupération: ${err.message}`);
    return [];
  }
};

export const findRoomById = async (roomId: Types.ObjectId): Promise<IRoom | null> => {
  try {
    logger.info(`[ROOM] Récupération par ID réalisée avec succès`);
    return Room.findById(roomId).exec();
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la récupération par ID: ${err.message}`);
    return null;
  }
};

export const createRoom = async (room: Partial<IRoom>): Promise<IRoom | null> => {
  try {
    logger.info(`[ROOM] Création réalisée avec succès`);
    return Room.create(room);
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la création: ${err.message}`);
    return null;
  }
};

export const updateRoom = async (roomId: Types.ObjectId, updateData: Partial<IRoom>): Promise<IRoom | null> => {
  try {
    logger.info(`[ROOM] Mise à jour réalisée avec succès`);
    return Room.findByIdAndUpdate(roomId, updateData, { new: true }).exec();
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la mise à jour: ${err.message}`);
    return null;
  }
};

export const deleteRoom = async (roomId: Types.ObjectId): Promise<boolean> => {
  try {
    logger.info(`[ROOM] Suppression réalisée avec succès`);
    await Room.findByIdAndDelete(roomId).exec();
    return true;
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la suppression: ${err.message}`);
    return false;
  }
};
