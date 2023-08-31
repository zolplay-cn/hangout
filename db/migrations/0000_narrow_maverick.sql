CREATE TABLE IF NOT EXISTS "guests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"code" varchar,
	"in_giveaway_pool" boolean DEFAULT true NOT NULL,
	"checked_in" boolean DEFAULT false NOT NULL,
	"event" varchar NOT NULL
);
