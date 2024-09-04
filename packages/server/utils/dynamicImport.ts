import { env } from "../config/env";
const { DB_TYPE } = env;

export const dynamicImport = async (modelName: string) => {
    return await import(`../models/${DB_TYPE}/${modelName}Model.ts`);
}