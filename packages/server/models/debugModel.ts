import { db } from "../config/pool";

import {debugs} from "../schemas/";
import logger from "../utils/logger";
import { Debug, NewDebug } from "../entities/debug";

export const findAllDebugEntries = (): Promise <Partial<Debug>[]> => {
  try {
    logger.info(`[DEBUG] Récupération réalisée avec succès`);
    return db.query.debugs.findMany({
      columns: {
        id: true,
        timestamp: true,
        message: true
      }
    });
  } catch (err: any) {
    logger.error(`[DEBUG] Echec lors de la récupération des logs: ${err.message}`);
    throw new Error("Impossible de récupérer les logs");
  }
}

export const createDebugEntry = (debug: NewDebug) => {
  try {
    logger.info(`[RESERVATION] Création réalisée avec succès`);
    return db.insert(debugs).values(debug).execute();
  } catch (err: any) {
    logger.error(`[RESERVATION] Echec lors de la création du log [${debug.id}]: ${err.message}`);
    throw new Error(`Impossible de créer le log`);
  }
}