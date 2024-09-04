import { Request, Response } from "express";
import { APIResponse, verifyPassword } from "../utils";
import { env } from "../config/env";
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const { JWT_SECRET, NODE_ENV } = env;


export const authLogin = async (request: Request, response: Response) => {
    const {email, password} = request.body;
    try {
        logger.info(`Tentative de connexion: ${email}`);
        const user = {                      // A récup dans la DB
            email : "test@gmail.com",
            password: "8291028910"
        }

        const validPassword = await verifyPassword(user.password, password);
        if (!validPassword) {
            logger.info(`Mauvais mot de passe: ${email}`);
            APIResponse(response, validPassword, "Mauvais mot de passe", 401);
        } else {
            logger.info(`Connexion réalisée avec succès: ${email}`);
            const badge = jwt.sign(email, JWT_SECRET, {expiresIn:"1h"});
            response.cookie("Token", badge, {httpOnly:true, sameSite:"strict", secure:NODE_ENV==="production"});
            APIResponse(response, validPassword, "Vous êtes maintenant connecté");
        }
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion ${email}: ${err.message}`);
        APIResponse(
            response,
            null,
            `Erreur lors de la récupération`,
            500
        );
    }
}