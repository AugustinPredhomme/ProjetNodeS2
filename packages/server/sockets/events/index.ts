import { Server, Socket } from "socket.io";
import { postMessage, removeMessage } from "./messages";
import { authenticateSocket } from "../cookies";

export function setupSocketEvent(io: Server) {
    io.on('connection', (socket: Socket) => {

        const userId = authenticateSocket(socket);
        if (!userId) {
            console.error("L'utilisateur n'est pas authentifié !");
            return;
        }

        console.info(`${socket.id} is connected!`);

        socket.on('sendMessage', (data) => postMessage(socket, io, data, userId))
        socket.on("deleteMessage", (data) => removeMessage(socket, io, data, userId));

        socket.on('disconnect', () => {
            console.info(`${socket.id} disconnected... :(`);
        })
    });
}