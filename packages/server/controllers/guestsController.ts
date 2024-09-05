import { Request, Response } from "express";
import { z } from 'zod';
import { APIResponse, dynamicImport } from "../utils";
import {
  findAllGuests,
  findGuestById,
  createGuest,
  updateGuest,
  deleteGuest,
} from "../models/guestsModel";
import { guestSchema } from '../validations/guests';
import logger from '../utils/logger';
import { parseID } from "../utils/parse";

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
  const { findGuestById } = await dynamicImport("guest");
  const objectId = parseID(guestId);
  try {
    logger.info(`[GET] Récupérer l'invité avec l'id ${guestId}`);
    const guest = await findGuestById(objectId);
    if (!guest) {
      APIResponse(response, null, `L'invité avec l'id ${guestId} n'existe pas`);
    } else {
      APIResponse(response, guest, `Invité ${guestId} récupéré avec succès`);
    }
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
  const { updateGuest } = await dynamicImport("guest");
  const objectId = parseID(guestId);
  const updateData = request.body;
  try {
    logger.info(`[PUT] Mettre à jour l'invité avec l'id ${guestId}`);
    await updateGuest(objectId, updateData);
    APIResponse(response, null,`Invité ${guestId} mis à jour avec succès`);
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
  const { deleteGuest } = await dynamicImport("guest");
  const objectId = parseID(guestId);
  try {
    logger.info(`[DELETE] Supprimer l'invité avec l'id ${guestId}`);
    await deleteGuest(objectId, guestId);
    APIResponse(
      response,
      null,
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
