export interface EnvConfig {
    PORT: number;

    JWT_SECRET: string;
    JWT_EXPIRATION: string;

    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRATION: string;

    NODE_ENV: 'development' | 'production' | 'test';
    FRONTEND_URL: string;
    MONGO_URI: string;

    DATABASE_URL: string;
    DB_TYPE: 'drizzle' | 'mongoose';
}