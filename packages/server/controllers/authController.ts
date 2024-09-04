import { Request, Response } from "express";
import { APIResponse, verifyPassword, generateAccessToken, generateRefreshToken, dynamicImport, hashPassword } from "../utils";
import logger from '../utils/logger';
import { guestSchema } from "../validations/guests";
import { z } from "zod";


export const login = async (request: Request, response: Response) => {
    try {
        const { findByCredentials } = await dynamicImport("guest");
        const {email, password} = request.body;
        logger.info(`Tentative de connexion de ${email}`);

        const user = await findByCredentials(email);

        const validPassword = await verifyPassword(user.password, password);
        if (!validPassword) {
            logger.info(`Mauvais mot de passe: ${email}`);
            APIResponse(response, validPassword, "Mauvais mot de passe", 401);
        } else {
            logger.info(`Connexion réalisée avec succès: ${email}`);
            const accessToken = generateAccessToken(user.email);
            const refreshToken = generateRefreshToken(user.email);
            response.cookie("accessToken", accessToken, {httpOnly:true, secure:true, sameSite: "strict"});
            response.cookie("refreshToken", refreshToken, {httpOnly:true, secure:true, sameSite: "strict"});

            APIResponse(response, null, "Vous êtes maintenant connecté");
        }
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion: ${err.message}`);
        APIResponse(
            response,
            null,
            `Erreur lors de la récupération`,
            500
        );
    }
}

export const register = async (request: Request, response: Response) => {
    try {
        const { findByCredentials, pushGuest } = await dynamicImport("guest");
        const { name, email, password } = guestSchema.parse(request.body);
        const emailAlreadyExists = await findByCredentials(email);
        logger.info(`[AUTH] Création d'un invité`);
        if (emailAlreadyExists)
            return APIResponse(response, [], 'Cet email est déjà utilisé', 400);

        const hash = await hashPassword(password);
        if (!hash)
            throw new Error('Erreur lors du hashage du mot de passe');

        const newGuest = await pushGuest({name, email, password: hash });
        if (!newGuest)
            return APIResponse(response, [], `Erreur lors de la création de l'invité`, 500);
        APIResponse(response, newGuest._id, 'Invité créé avec succès');
    } catch (err: any) {
        logger.error(`[AUTH] Erreur lors de l'inscription: ${err.message}`);
        if (err instanceof z.ZodError)
            APIResponse(response, err.errors, 'Le formulaire est invalide', 400);
        else
            APIResponse(response, [], 'Une erreur est survenue', 500);
    }
}

export const logout = (request: Request, response: Response) => {
    logger.info('[AUTH] Déconnexion');
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
    APIResponse(response, [], 'Vous êtes déconnecté avec succès');
}