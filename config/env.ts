import { EnvConfig } from "../types/env";
import dotenv from "dotenv";

dotenv.config();

type NODE_ENV = 'production' | 'development' | 'test';

export const env: EnvConfig = {
    PORT: parseInt(process.env.PORT || "8000"),
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    NODE_ENV: process.env.NODE_ENV as NODE_ENV || 'development',
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/3wa"
}