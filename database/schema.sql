set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
  "username" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Games" (
	"gameId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"genreId" integer NOT NULL,
	"platformId" integer NOT NULL,
	CONSTRAINT "Games_pk" PRIMARY KEY ("gameId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Genres" (
	"genreId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "Genres_pk" PRIMARY KEY ("genreId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Platforms" (
	"platformId" integer NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "Platforms_pk" PRIMARY KEY ("platformId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Wishlist" (
	"gameId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "Wishlist_pk" PRIMARY KEY ("gameId","userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Reviews" (
	"reviewId" serial NOT NULL,
	"userId" integer NOT NULL,
	"notes" TEXT NOT NULL,
	CONSTRAINT "Reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Games" ADD CONSTRAINT "Games_fk0" FOREIGN KEY ("genreId") REFERENCES "Genres"("genreId");
ALTER TABLE "Games" ADD CONSTRAINT "Games_fk1" FOREIGN KEY ("platformId") REFERENCES "Platforms"("platformId");



ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_fk0" FOREIGN KEY ("gameId") REFERENCES "Games"("gameId");
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
