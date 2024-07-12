import { Request, Response } from "express";
import { APIResponse, verifyPassword } from "../utils";
import { env } from "../config/env";
import jwt from 'jsonwebtoken';

const { JWT_SECRET, NODE_ENV } = env;


export const authLogin = async (request: Request, response: Response) => {
    const {email, password} = request.body;
    try {
        const user = {                      // A récup dans la DB
            email : "test@gmail.com",
            password: "8291028910"
        }

        const validPassword = await verifyPassword(user.password, password);
        if (!validPassword) {
            APIResponse(response, validPassword, "Mauvais mot de passe", 401);
        } else {
            const badge = jwt.sign(email, JWT_SECRET, {expiresIn:"1h"});
            response.cookie("Token", badge, {httpOnly:true, sameSite:"strict", secure:NODE_ENV==="production"});
            APIResponse(response, validPassword, "Vous êtes maintenant connecté");
        }
    } catch (err) {
        APIResponse(
            response,
            null,
            `Erreur lors de la récupération`,
            500
        );
    }
}