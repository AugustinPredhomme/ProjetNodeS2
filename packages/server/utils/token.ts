import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Types } from "mongoose";
import logger from './logger';

const { JWT_SECRET, REFRESH_TOKEN_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = env;

export const generateAccessToken = (userId: any): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const generateRefreshToken = (userId: any): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

export const verifyRefreshToken = (token: string): string | Types.ObjectId | null => {
  try {
    logger.info(`[TOKEN] Vérification du refresh token`);
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as { userId: string };
    return decoded.userId;
  } catch (err) {
    logger.error(`Refresh Token invalide: ${token}`);
    return null;
  }
};