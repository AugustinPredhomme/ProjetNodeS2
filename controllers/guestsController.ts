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

export const getAllGuests = async (request: Request, response: Response) => {
  try {
    const guests = await findAllGuests();
    APIResponse(response, guests, "[GET] Récupérer tout les invités");
  } catch (err) {
    console.error(err);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const getGuestById = async (request: Request, response: Response) => {
  const { guestId } = request.params;
  try {
    const guest = await findGuestById(new mongoose.Types.ObjectId(guestId));
    APIResponse(
      response,
      guest,
      `[GET] Récupérer l'invité avec l'id ${guestId}`
    );
  } catch (err) {
    console.error(err);
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
    guestSchema.parse(request.body);
    const newGuest = request.body;
    const createdGuest = await createGuest(newGuest);
    APIResponse(response, createdGuest, "[POST] Créer un invité");
  } catch (err) {
    console.error(err);
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
    const updateData = request.body;
    const updatedGuest = await updateGuest(
      new mongoose.Types.ObjectId(guestId),
      updateData
    );
    APIResponse(
      response,
      updatedGuest,
      `[PUT] Mettre à jour l'invité avec l'id ${guestId}`
    );
  } catch (err) {
    console.error(err);
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
    const deleted = await deleteGuest(new mongoose.Types.ObjectId(guestId));
    APIResponse(
      response,
      deleted,
      `[DELETE] Supprimer l'invité avec l'id ${guestId}`
    );
  } catch (err) {
    console.error(err);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de l'invité avec l'id ${guestId}`,
      500
    );
  }
};
