-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reminders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Completed" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_reminders" ("Completed", "Description", "created_at", "id", "title", "updated_at") SELECT "Completed", "Description", "created_at", "id", "title", "updated_at" FROM "reminders";
DROP TABLE "reminders";
ALTER TABLE "new_reminders" RENAME TO "reminders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
