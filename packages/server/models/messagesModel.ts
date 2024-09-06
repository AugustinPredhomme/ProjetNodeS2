import { db } from "../config/pool";
import { messages } from "../schemas";
import { NewMessage } from "../entities/message";
import { and, eq } from "drizzle-orm";
import logger from "../utils/logger";

export const sendMessage = (newMessage: NewMessage) => {
    try {
        return db.insert(messages).values(newMessage).returning().execute()
    } catch (err) {
        logger.error(err);
        throw new Error('Impossible d\'envoyer le message');
    }
}

export const deleteMessage = (data: { id: string, userId: string }) => {
    try {
        return db.delete(messages).where(
            and(
                eq(messages.id, data.id),
                eq(messages.author, data.userId)
            )
        ).execute()
    } catch (err) {
        logger.error(err);
        throw new Error('Impossible de supprimer le message');
    }
}