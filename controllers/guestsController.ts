import { Request, Response } from "express";
import { z } from 'zod';
import { APIResponse } from "../utils";
import {
  findAllGuests,
  findGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../models/guestsModel";
import mongoose from "mongoose";
import { guestSchema } from '../validations/guests';
import logger from '../utils/logger';

export const getAllGuests = async (request: Request, response: Response) => {
  try {
    logger.info("[GET] Récupérer tout les invités");
    const guests = await findAllGuests();
    APIResponse(response, guests, "Invités récupérés avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération des invités: ${err.message}`);
    APIResponse(response, null, "Erreur lors de la récupération des invités", 500);
  }
};

export const getGuestById = async (request: Request, response: Response) => {
  const { guestId } = request.params;
  try {
    logger.info(`[GET] Récupérer l'invité avec l'id ${guestId}`);
    const guest = await findGuestById(new mongoose.Types.ObjectId(guestId));
    APIResponse(
      response,
      guest,
      `Invité ${guestId} récupéré avec succès`
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération de l'invité ${guestId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la récupération de l'invité avec l'id ${guestId}`,
      500
    );
  }
};

export const pushGuest = async (request: Request, response: Response) => {
  try {
    logger.info(`[POST] Créer un invité`);
    guestSchema.parse(request.body);
    const newGuest = request.body;
    const createdGuest = await createGuest(newGuest);
    APIResponse(response, createdGuest, "Invité créé avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la création de l'invité: ${err.message}`);
    if (err instanceof z.ZodError) {
      APIResponse(
        response,
        err.errors,
        "Les informations de l'invité sont incorrectes",
        400
      );
    } else {
      APIResponse(response, null, "Une erreur interne est survenue", 500);
    }
  }
};

export const upGuest = async (request: Request, response: Response) => {
  const { guestId } = request.params;
  try {
    logger.info(`[PUT] Mettre à jour l'invité avec l'id ${guestId}`);
    const updateData = request.body;
    const updatedGuest = await updateGuest(
      new mongoose.Types.ObjectId(guestId),
      updateData
    );
    APIResponse(
      response,
      updatedGuest,
      `Invité ${guestId} mis à jour avec succès`
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la mise à jour de l'invité ${guestId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la mise à jour de l'invité avec l'id ${guestId}`,
      500
    );
  }
};

export const delGuest = async (request: Request, response: Response) => {
  const { guestId } = request.params;
  try {
    logger.info(`[DELETE] Supprimer l'invité avec l'id ${guestId}`);
    const deleted = await deleteGuest(new mongoose.Types.ObjectId(guestId));
    APIResponse(
      response,
      deleted,
      `Invité ${guestId} supprimé avec succès`
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la suppression de l'invité ${guestId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de l'invité avec l'id ${guestId}`,
      500
    );
  }
};
