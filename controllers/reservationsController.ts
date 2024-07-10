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
//import { reservationSchema } from '../validations/reservations'; // Schema Validation (à dev)
import mongoose from "mongoose";

export const getAllReservations = async (
  request: Request,
  response: Response
) => {
  try {
    const reservations = await findAllReservations();
    APIResponse(
      response,
      reservations,
      "[GET] Récupérer tout les réservations"
    );
  } catch (err) {
    console.error(err);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const getReservationById = async (
  request: Request,
  response: Response
) => {
  const { reservationId } = request.params;
  try {
    const reservation = await findReservationById(
      new mongoose.Types.ObjectId(reservationId)
    );
    APIResponse(
      response,
      reservation,
      `[GET] Récupérer la réservation avec l'id ${reservationId}`
    );
  } catch (err) {
    console.error(err);
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
    //reservationSchema.parse(request.body); // Validate reservation data
    const newReservation = request.body;
    const createdReservation = await createReservation(newReservation);
    APIResponse(response, createdReservation, "[POST] Créer une réservation");
  } catch (err) {
    console.error(err);
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
    const updateData = request.body;
    const updatedReservation = await updateReservation(
      new mongoose.Types.ObjectId(reservationId),
      updateData
    );
    APIResponse(
      response,
      updatedReservation,
      `[PUT] Mettre à jour la réservation avec l'id ${reservationId}`
    );
  } catch (err) {
    console.error(err);
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
    const deleted = await deleteReservation(
      new mongoose.Types.ObjectId(reservationId)
    );
    APIResponse(
      response,
      deleted,
      `[DELETE] Supprimer la réservation avec l'id ${reservationId}`
    );
  } catch (err) {
    console.error(err);
    APIResponse(
      response,
      null,
      `Erreur lors de la suppression de la réservation avec l'id ${reservationId}`,
      500
    );
  }
};
