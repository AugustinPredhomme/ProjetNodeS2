import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { rooms } from "../schemas";

export type Room = InferSelectModel<typeof rooms>;
export type NewRoom = InferInsertModel<typeof rooms>;

export type RoomColumns = { [K in keyof Room]?: boolean }