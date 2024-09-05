import { Request, Response } from "express";
import { z } from "zod";
import { APIResponse, dynamicImport } from "../utils";
import {
  findAllRooms,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../models/roomsModel";
import { roomSchema } from '../validations/rooms';
import logger from '../utils/logger';
import { parseID } from "../utils/parse";

export const getAllRooms = async (request: Request, response: Response) => {
  try {
    logger.info("[GET] Récupérer toutes les chambres");
    const rooms = await findAllRooms();
    APIResponse(response, rooms, "Chambres récupérées avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération des chambres: ${err.message}`);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const getRoomById = async (request: Request, response: Response) => {
  const { roomId } = request.params;
  const { findRoomById } = await dynamicImport("room");
  const objectId = parseID(roomId);
  try {
    logger.info(`[GET] Récupérer la chambre avec l'id ${roomId}`);
    const room = await findRoomById(objectId);
    if (!room) {
      APIResponse(response, null, `La chambre avec l'id ${roomId} n'existe pas`);
    } else {
      APIResponse(response, room, `Chambre ${roomId} récupérée avec succès`);
    }
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération de la chambre ${roomId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la récupération de la chambre avec l'id ${roomId}`,
      500
    );
  }
};

export const pushRoom = async (request: Request, response: Response) => {
  try {
    logger.info(`[POST] Créer une chambre`);
    roomSchema.parse(request.body);
    const newRoom = request.body;
    const createdRoom = await createRoom(newRoom);
    APIResponse(response, createdRoom, "Chambre créée avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la création de la chambre: ${err.message}`);
    if (err instanceof z.ZodError) {
      APIResponse(
        response,
        err.errors,
        "Les informations de la chambre sont incorrectes",
        400
      );
    } else {
      APIResponse(response, null, "Une erreur interne est survenue", 500);
    }
  }
};

export const upRoom = async (request: Request, response: Response) => {
  const { roomId } = request.params;
  const { updateRoom } = await dynamicImport("room");
  const objectId = parseID(roomId);
  const updateData = request.body;
  try {
    logger.info(`[PUT] Mettre à jour la chambre avec l'id ${roomId}`);
    await updateRoom(objectId, updateData);
    APIResponse(response, null,`Chambre ${roomId} mise à jour avec succès`);
  } catch (err: any) {
    logger.error(`Erreur lors de la mise à jour de la chambre ${roomId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la mise à jour de la chambre avec l'id ${roomId}`,
      500
    );
  }
};

export const delRoom = async (request: Request, response: Response) => {
  const { roomId } = request.params;
  const { deleteGuest } = await dynamicImport("room");
  const objectId = parseID(roomId);
  try {
    logger.info(`[DELETE] Supprimer la chambre avec l'id ${roomId}`);
    await deleteGuest(objectId, roomId);
    APIResponse(
      response,
      null,
      `Chambre ${roomId} supprimée avec succès`
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la suppression de la chambre ${roomId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de la chambre avec l'id ${roomId}`,
      500
    );
  }
};
