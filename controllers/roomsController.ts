import { Request, Response } from "express";
import { z } from "zod";
import { APIResponse } from "../utils";
import {
  findAllRooms,
  findRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../models/roomsModel";
//import { roomSchema } from '../validations/rooms'; // Schema Validation (à dev)
import mongoose from "mongoose";

export const getAllRooms = async (request: Request, response: Response) => {
  try {
    const rooms = await findAllRooms();
    APIResponse(response, rooms, "[GET] Récupérer tout les chambres");
  } catch (err) {
    console.error(err);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const getRoomById = async (request: Request, response: Response) => {
  const { roomId } = request.params;
  try {
    const room = await findRoomById(new mongoose.Types.ObjectId(roomId));
    APIResponse(
      response,
      room,
      `[GET] Récupérer la chambre avec l'id ${roomId}`
    );
  } catch (err) {
    console.error(err);
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
    //roomSchema.parse(request.body); // Validate room data
    const newRoom = request.body;
    const createdRoom = await createRoom(newRoom);
    APIResponse(response, createdRoom, "[POST] Créer une chambre");
  } catch (err) {
    console.error(err);
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
  try {
    const updateData = request.body;
    const updatedRoom = await updateRoom(
      new mongoose.Types.ObjectId(roomId),
      updateData
    );
    APIResponse(
      response,
      updatedRoom,
      `[PUT] Mettre à jour la chambre avec l'id ${roomId}`
    );
  } catch (err) {
    console.error(err);
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
  try {
    const deleted = await deleteRoom(new mongoose.Types.ObjectId(roomId));
    APIResponse(
      response,
      deleted,
      `[DELETE] Supprimer la chambre avec l'id ${roomId}`
    );
  } catch (err) {
    console.error(err);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de la chambre avec l'id ${roomId}`,
      500
    );
  }
};
