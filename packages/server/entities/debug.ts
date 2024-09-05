import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { debugs } from "../schemas";

export type Debug = InferSelectModel<typeof debugs>;

export type NewDebug = InferInsertModel<typeof debugs>;

export type DebugColumns = { [K in keyof Debug]?: boolean }