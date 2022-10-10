DROP TABLE IF EXISTS "todo";

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(150),
	"complete" BOOLEAN DEFAULT FALSE);
	
	
INSERT INTO "todo" ("task", "complete")
VALUES ('grocery shopping', FALSE);

SELECT * FROM "todo"
ORDER BY "id" ASC

