import { Types } from 'mongoose';
import Debug, { IDebug } from '../schemas/debugSchema';
import logger from '../utils/logger';

export const createDebugEntry = async (message: string): Promise<IDebug | null> => {
  try {
    logger.info(`[DEBUG] Création réalisée avec succès`);
    return Debug.create({ message, timestamp: Date.now() });
  } catch (err: any) {
    logger.error(`[DEBUG] Echec lors de la création: ${err.message}`);
    return null;
  }
};

export const findAllDebugEntries = async (): Promise<IDebug[]> => {
  try {
    logger.info(`[DEBUG] Récupération avec succès`);
    return Debug.find().exec();
  } catch (err:any ) {
    logger.error(`[DEBUG] Echec lors de la récupération: ${err.message}`);
    return [];
  }
};
