import { connect } from "mongoose";
import { env } from "./env";

const { MONGO_URI } = env;

export const connectDB = async (): Promise<void> => {
    try {
        const c = await connect(MONGO_URI)
        console.log(`Connected to MongoDB: ${c.connection.host}`);
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
}