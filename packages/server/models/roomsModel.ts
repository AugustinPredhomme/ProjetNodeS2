/*
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
*/

import { eq } from "drizzle-orm";

import { db } from "../config/pool";

import {rooms } from "../schemas/";
import logger from "../utils/logger";
import { Room, NewRoom } from "../entities/room";

export const findAllRooms = (): Promise <Partial<Room>[]> => {
  try {
    logger.info(`[ROOM] Récupération réalisée avec succès`);
    return db.query.rooms.findMany({
      columns: {
        id: true,
        roomType: true,
        capacity: true,
        amenities: true
      }
    });
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la récupération des chambres: ${err.message}`);
    throw new Error("Impossible de récupérer les chambres");
  }
}

export const findRoomById = (id: string) => {
  try {
    logger.info(`[ROOM] Récupération par ID réalisée avec succès`);
    return db.select({
      id: rooms.id,
      roomType: rooms.roomType,
      capacity: rooms.capacity,
      ameneties: rooms.amenities
    }).from (rooms)
    .where(eq(rooms.id, id))
    .execute()
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la récupération de la chambre [${id}]: ${err.message}`);
    throw new Error(`Impossible de récupérer la chambre`);
  }
}

export const createRoom = (room: NewRoom) => {
  try {
    logger.info(`[ROOM] Création réalisée avec succès`);
    return db.insert(rooms).values(room).execute();
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la création de la chambre [${room.id}]: ${err.message}`);
    throw new Error(`Impossible de créer la chambre`);
  }
}

export const updateRoom = (room: Room) => {
  try {
    return db.update(rooms).set(room).where(
      eq(rooms.id, room.id)
    ).execute();
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la mise à jour de la chambre [${room.id}]: ${err.message}`);
    throw new Error(`Impossible de mettre à jour la chambre`);
  }
}

export const deleteRoom = (id: string) => {
  try {
    logger.info(`[ROOM] Suppression réalisée avec succès`);
    return db.delete(rooms).where(
        eq(rooms.id, id)
      )
  } catch (err: any) {
    logger.error(`[ROOM] Echec lors de la suppression de la chambre [${id}]: ${err.message}`);
    throw new Error(`Impossible de supprimer la chambre`);
  }
}