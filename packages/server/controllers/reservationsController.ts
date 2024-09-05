import { Request, Response } from "express";
import { z } from "zod";
import { APIResponse, dynamicImport } from "../utils";
import {
  findAllReservations,
  findReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../models/reservationsModel";
import { reservationSchema } from '../validations/reservations';
import mongoose from "mongoose";
import logger from '../utils/logger';
import { parseID } from "../utils/parse";

export const getAllReservations = async (
  request: Request,
  response: Response
) => {
  try {
    logger.info("[GET] Récupérer touts les réservations");
    const reservations = await findAllReservations();
    APIResponse(
      response,
      reservations,
      "Réservations récupérées avec succès"
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération des réservations: ${err.message}`);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const getReservationById = async (request: Request, response: Response) => {
  const { reservationId } = request.params;
  const { findRoomById } = await dynamicImport("reservation");
  const objectId = parseID(reservationId);
  try {
    logger.info(`[GET] Récupérer la réservation avec l'id ${reservationId}`);
    const reservation = await findRoomById(objectId);
    if (!reservation) {
      APIResponse(response, null, `La réservation avec l'id ${reservationId} n'existe pas`);
    } else {
      APIResponse(response, reservation, `Réservation ${reservationId} récupérée avec succès`);
    }
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération de la réservation ${reservationId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la récupération de la réservation avec l'id ${reservationId}`,
      500
    );
  }
};

export const pushReservation = async (request: Request, response: Response) => {
  try {
    logger.info(`[POST] Créer une réservation`);
    reservationSchema.parse(request.body);
    const newReservation = request.body;
    const createdReservation = await createReservation(newReservation);
    APIResponse(response, createdReservation, "Réservation créée avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la création de la réservation: ${err.message}`);
    if (err instanceof z.ZodError) {
      APIResponse(
        response,
        err.errors,
        "Les informations de la réservation sont incorrectes",
        400
      );
    } else {
      APIResponse(response, null, "Une erreur interne est survenue", 500);
    }
  }
};

export const upReservation = async (request: Request, response: Response) => {
  const { reservationId } = request.params;
  const { updateRoom } = await dynamicImport("reservation");
  const objectId = parseID(reservationId);
  const updateData = request.body;
  try {
    logger.info(`[PUT] Mettre à jour la réservation avec l'id ${reservationId}`);
    await updateRoom(objectId, updateData);
    APIResponse(response, null,`Réservation ${reservationId} mise à jour avec succès`);
  } catch (err: any) {
    logger.error(`Erreur lors de la mise à jour de la réservation ${reservationId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la mise à jour de la réservation avec l'id ${reservationId}`,
      500
    );
  }
};

export const delReservation = async (request: Request, response: Response) => {
  const { reservationId } = request.params;
  const { deleteGuest } = await dynamicImport("reservation");
  const objectId = parseID(reservationId);
  try {
    logger.info(`[DELETE] Supprimer la réservation avec l'id ${reservationId}`);
    await deleteGuest(objectId, reservationId);
    APIResponse(
      response,
      null,
      `Réservation ${reservationId} supprimée avec succès`
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la suppression de la réservation ${reservationId}: ${err.message}`);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de la réservation avec l'id ${reservationId}`,
      500
    );
  }
};
