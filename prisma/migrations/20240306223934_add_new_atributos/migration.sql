/*
  Warnings:

  - Added the required column `active` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "companyId" TEXT,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL,
    "creatorId" TEXT NOT NULL,
    CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("companyId", "end_date", "id", "name", "start_date") SELECT "companyId", "end_date", "id", "name", "start_date" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_creatorId_key" ON "Project"("creatorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
