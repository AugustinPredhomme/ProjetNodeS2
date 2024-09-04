import { EnvConfig } from "../types/env";
import dotenv from "dotenv";

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test': '.env' });

type NODE_ENV = 'production' | 'development' | 'test';

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),

    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '15m',

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh',
    REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION || '7d',

    NODE_ENV: process.env.NODE_ENV as NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/3wa",

    DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:admin@localhost:5432/3wa",

    DB_TYPE: process.env.DB_TYPE as "drizzle" | "mongoose" || "drizzle"
}