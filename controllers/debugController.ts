import { Request, Response } from "express";
import { APIResponse } from "../utils";
import { createDebugEntry, findAllDebugEntries } from "../models/debugModel";

export const getAllDebugEntries = async (
  request: Request,
  response: Response
) => {
  try {
    const debugEntries = await findAllDebugEntries();
    APIResponse(
      response,
      debugEntries,
      "[GET] Récupérer tout les messages de debug"
    );
  } catch (err) {
    console.error(err);
    APIResponse(response, [], "Une erreur interne est survenue", 500);
  }
};

export const pushDebugEntry = async (request: Request, response: Response) => {
  try {
    const { message } = request.body;
    const newEntry = await createDebugEntry(message);
    APIResponse(response, newEntry, "[POST] Créer un message de debug");
  } catch (err) {
    console.error(err);
    APIResponse(response, null, "Une erreur interne est survenue", 500);
  }
};
