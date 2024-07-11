import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import { APIResponse } from "../utils";

const { JWT_SECRET } = env;

export const authMiddleware = (request: Request, res: Response, next: NextFunction) => {
    const { token } = request.cookies;
    if (!token)
        return APIResponse(res, null, "Missing authentication token", 401);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        res.locals.user = decoded;
        next();
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return APIResponse(res, null, 'Token expired. Please login again', 401);
        } else if (err instanceof jwt.JsonWebTokenError) {
            return APIResponse(res, null, 'Invalid authentication token', 401);
        } else {
            next(err);
        }
    }
};