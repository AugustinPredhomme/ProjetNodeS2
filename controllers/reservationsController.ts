import { Request, Response } from "express";
import { z } from "zod";
import { APIResponse } from "../utils";
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

export const getReservationById = async (
  request: Request,
  response: Response
) => {
  const { reservationId } = request.params;
  try {
    logger.info(`[GET] Récupérer la réservation avec l'id ${reservationId}`);
    const reservation = await findReservationById(
      new mongoose.Types.ObjectId(reservationId)
    );
    APIResponse(
      response,
      reservation,
      `Réservation ${reservationId} récupérée avec succès`
    );
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
  try {
    logger.info(`[PUT] Mettre à jour la réservation avec l'id ${reservationId}`);
    const updateData = request.body;
    const updatedReservation = await updateReservation(
      new mongoose.Types.ObjectId(reservationId),
      updateData
    );
    APIResponse(
      response,
      updatedReservation,
      `Réservation ${reservationId} mise à jour avec succès`
    );
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
  try {
    logger.info(`[DELETE] Supprimer la réservation avec l'id ${reservationId}`);
    const deleted = await deleteReservation(
      new mongoose.Types.ObjectId(reservationId)
    );
    APIResponse(
      response,
      deleted,
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
