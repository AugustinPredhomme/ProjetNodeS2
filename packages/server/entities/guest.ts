import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { guests } from "../schemas";

export type Guest = InferSelectModel<typeof guests>;

export type NewGuest = InferInsertModel<typeof guests>;

export type GuestColumns = { [K in keyof Guest]?: boolean }