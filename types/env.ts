export interface EnvConfig {
    PORT: number;
    JWT_SECRET: string;
    NODE_ENV: 'development' | 'production' | 'test';
    FRONTEND_URL: string;
    MONGO_URI: string;
}