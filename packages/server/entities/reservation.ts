import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { reservations } from "../schemas";

export type Reservation = InferSelectModel<typeof reservations>;
export type NewReservation = InferInsertModel<typeof reservations>;

export type ReservationColumns = { [K in keyof Reservation]?: boolean }