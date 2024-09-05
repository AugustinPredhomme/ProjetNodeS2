CREATE TABLE IF NOT EXISTS "guests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	CONSTRAINT "guests_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guestId" integer,
	"roomId" integer,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"roomType" varchar(50) NOT NULL,
	"capacity" integer NOT NULL,
	"ameneties" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_guestId_guests_id_fk" FOREIGN KEY ("guestId") REFERENCES "public"."guests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
