import { Server, Socket } from "socket.io";
import { sendMessage, deleteMessage } from "../../models/messagesModel";
import logger from "../../utils/logger";

export const postMessage = async (socket: Socket, io: Server, data: { roomId: string, content: string }, userId: string) => {
    try {
        const [ message ] = await sendMessage({ ...data, author: userId })
        if (!message)
            throw new Error("Impossible de créer le message en DB");
        io.in(data.roomId).emit('message', { message: message.content, author: message.author, date: message.date, id: message.id })
    } catch (err: any) {
        logger.error(`Erreur lors de l'envoi du message: ${err.message}`);
        socket.emit("error", "Impossible de créer le message");
    }
}

export const removeMessage = async (socket: Socket, io: Server, data: { id: string, roomId: string }, userId: string) => {
    try {
        await deleteMessage({ ...data, userId });
        io.in(data.roomId).emit('deletedMessage', data.id);
    } catch (err: any) {
        logger.error(`Erreur lors de la suppression du message [${data.id}]: ${err.message}`);
        socket.emit("error", "Impossible de supprimer le message");
    }
}