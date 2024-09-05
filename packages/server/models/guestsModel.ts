import { eq } from "drizzle-orm";

import { db } from "../config/pool";

import { guests} from "../schemas/";
import logger from "../utils/logger";
import { Guest, NewGuest, GuestColumns } from "../entities/guest";

export const findAllGuests = (): Promise <Partial<Guest>[]> => {
  try {
    logger.info(`[GUEST] Récupération réalisée avec succès`);
    return db.query.guests.findMany({
      columns: {
        id: true,
        email: true,
        name: true
      }
    });
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la récupération: ${err.message}`);
    throw new Error("Impossible de récupérer les invités");
  }
}

export const findGuestById = (id: string) => {
  try {
    logger.info(`[GUEST] Récupération par ID réalisée avec succès`);
    return db.select({
      id: guests.id,
      name: guests.name,
      email: guests.email
    }).from (guests)
    .where(eq(guests.id, id))
    .execute()
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la récupération de l'invité [${id}]: ${err.message}`);
    throw new Error(`Impossible de récupérer l'invité`);
  }
}

export const createGuest = (guest: NewGuest) => {
  try {
    logger.info(`[GUEST] Création réalisée avec succès`);
    return db.insert(guests).values(guest).execute();
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la création de l'invité [${guest.email}]: ${err.message}`);
    throw new Error(`Impossible de créer l'invité`);
  }
}

export const updateGuest = (guest: Guest) => {
  try {
    return db.update(guests).set(guest).where(
      eq(guests.id, guest.id)
    ).execute();
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la mise à jour de l'invité [${guest.id}]: ${err.message}`);
    throw new Error(`Impossible de mettre à jour l'invité`);
  }
}

export const deleteGuest = (id: string) => {
  try {
    logger.info(`[GUEST] Suppression réalisée avec succès`);
    return db.delete(guests).where(
        eq(guests.id, id)
      )
  } catch (err: any) {
    logger.error(`[GUEST] Echec lors de la suppression de l'invité [${id}]: ${err.message}`);
    throw new Error(`Impossible de supprimer l'invité`);
  }
}

export const findByCredentials = (email: string, columns: GuestColumns): Promise <Partial<Guest | undefined>> => {
  try {
    logger.info(`[GUEST] Find By Credentials`);
    return db.query.guests.findFirst({
      where: eq(guests.email, email),
      columns
    });
  } catch (err: any) {
    logger.error(`Une erreur est survenue lors de la récupération de l'invité [${email}]: ${err.message}`);
    throw new Error(`Impossible de récupérer l'invité`);
  }
}