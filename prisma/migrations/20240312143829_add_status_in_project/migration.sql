-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT,
    "assigneeId" TEXT,
    "creatorId" TEXT NOT NULL,
    "start_date" DATETIME NOT NULL,
    "end_date" DATETIME NOT NULL,
    "active" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DONE',
    CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("active", "assigneeId", "creatorId", "end_date", "id", "name", "projectId", "start_date") SELECT "active", "assigneeId", "creatorId", "end_date", "id", "name", "projectId", "start_date" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
