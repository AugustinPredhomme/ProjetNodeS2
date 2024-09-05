import { Types } from "mongoose";
import { env } from "../config/env";
const { DB_TYPE } = env;

export const parseID = (id: string) => {
    return DB_TYPE === "drizzle" ? id?.trim() : new Types.ObjectId(id);
}