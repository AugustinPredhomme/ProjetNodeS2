import { NextFunction, Request, Response } from "express";
import { APIResponse, verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../utils";
import jwt from "jsonwebtoken";
import logger from '../utils/logger';
import { env } from "../config/env";
import { Types } from "mongoose";
import { findGuestById, updateGuest } from "../models/guestsModel";

const { JWT_SECRET, NODE_ENV } = env;

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        logger.warn(`[TOKEN] Token manquant`);
        return next();
    }

    try {
        logger.info(``);
        jwt.verify(accessToken, JWT_SECRET);
        return next();
    } catch (error) {
        const userId = verifyRefreshToken(refreshToken) as Types.ObjectId;
        if (!userId) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            logger.warn(`[TOKEN] Token invalide`);
            return APIResponse(res, null, 'Invalid Refresh Token.', 403);
        }

        const user = await findGuestById(userId);
        if (!user || user.guest.refreshToken !== refreshToken) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            logger.warn(`[TOKEN] Token invalide`);
            return APIResponse(res, null, 'Invalid Refresh Token.', 403);
        }

        const newAccessToken = generateAccessToken(userId);
        const newRefreshToken = generateRefreshToken(userId);
        await updateGuest(userId, { refreshToken: newRefreshToken });

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: 'strict'
        });
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: NODE_ENV === "production",
            sameSite: 'strict'
        });

        next();
    }
};