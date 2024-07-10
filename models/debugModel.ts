import { Types } from 'mongoose';
import Debug, { IDebug } from '../schemas/debugSchema';

export const createDebugEntry = async (message: string): Promise<IDebug | null> => {
  try {
    return Debug.create({ message, timestamp: Date.now() });
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findAllDebugEntries = async (): Promise<IDebug[]> => {
  try {
    return Debug.find().exec();
  } catch (err) {
    console.error(err);
    return [];
  }
};
