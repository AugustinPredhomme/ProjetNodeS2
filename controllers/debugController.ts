import { Request, Response } from "express";
import { APIResponse } from "../utils";
import { createDebugEntry, findAllDebugEntries } from "../models/debugModel";
import logger from '../utils/logger';

export const getAllDebugEntries = async (
  request: Request,
  response: Response
) => {
  try {
    logger.info("[GET] Récupérer tout les messages de debug");
    const debugEntries = await findAllDebugEntries();
    APIResponse(
      response,
      debugEntries,
      "Messages récupérés avec succès"
    );
  } catch (err: any) {
    logger.error(`Erreur lors de la récupération des messages: ${err.message}`);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const pushDebugEntry = async (request: Request, response: Response) => {
  try {
    logger.info(`[POST] Créer un message de debug`);
    const { message } = request.body;
    const newEntry = await createDebugEntry(message);
    APIResponse(response, newEntry, "Message créé avec succès");
  } catch (err: any) {
    logger.error(`Erreur lors de la création du message: ${err.message}`);
    APIResponse(response, null, "Une erreur interne est survenue", 500);
  }
};
