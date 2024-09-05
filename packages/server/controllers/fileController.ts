import { Request, Response } from 'express';
import { APIResponse } from '../utils';
import logger from '../utils/logger';

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    logger.error('[FILE] Aucun fichier upload');
    return APIResponse(res, null, 'No file uploaded', 400);
  }
  logger.info(`[FILE] Fichier chargé: ${req.file.filename}`);
  APIResponse(res, req.file, 'File uploaded successfully', 201);
};

export const uploadMultipleFiles = (req: Request, res: Response) => {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        logger.error(`[FILE] Aucun fichier upload`);
        return APIResponse(res, null, 'No file uploaded', 400);
    }
    logger.info(`[FILE] Fichiers chargés: ${req.files}`);
    APIResponse(res, req.files, 'Files uploaded successfully', 201);
};