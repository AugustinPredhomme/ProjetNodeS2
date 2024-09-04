import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils";
import logger from '../utils/logger';

const { JWT_SECRET } = env;

export const authMiddleware = (request: Request, res: Response, next: NextFunction) => {
    const { accessToken } = request.cookies;
    if (!accessToken) {
        logger.warn(`[TOKEN] Token d'authentification manquant`);
        return APIResponse(res, null, "Missing authentication token", 401);
    }
    try {
        logger.info(`[TOKEN] Vérification du token`)
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        res.locals.user = decoded;
        next();
    } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
            logger.warn(`[TOKEN] Token Expiré: ${err.message}`);
            return APIResponse(res, null, 'Token expired. Please login again', 401);
        } else if (err instanceof jwt.JsonWebTokenError) {
            logger.error(`[TOKEN] Erreur d'authentification: ${err.message}`);
            return APIResponse(res, null, 'Invalid authentication token', 401);
        } else {
            next(err);
        }
    }
};