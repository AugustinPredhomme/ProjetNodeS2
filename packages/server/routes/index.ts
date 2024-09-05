import { Router } from "express";
import { env } from "../config/env";

import guestsRouter from "./guestsRoutes";
import roomsRouter from "./roomsRoutes";
import reservationRouter from "./reservationsRoutes";
import debugRouter from "./debugRoutes";
import authRouter from "./authRoutes";
import fileRouter from './fileRoute';

const { NODE_ENV } = env;

const router = Router();

// http://localhost:8000/api/guests
router.use('/guests', guestsRouter);

// http://localhost:8000/api/rooms
router.use("/rooms", roomsRouter);

// http://localhost:8000/api/reservations
router.use('/reservations', reservationRouter);

// http://localhost:8000/api/auth
router.use('/auth', authRouter);

// http://localhost:8000/api/files
router.use('/files', fileRouter);


if (NODE_ENV === "development")
    router.use('/debug', debugRouter)

export default router;