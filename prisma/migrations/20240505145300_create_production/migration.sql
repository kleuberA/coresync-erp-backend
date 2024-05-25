-- CreateTable
CREATE TABLE "Production" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "billOfMaterials" TEXT NOT NULL,
    "productionQuantity" TEXT NOT NULL,
    "scheduledStartDate" DATETIME NOT NULL,
    "scheduledEndDate" DATETIME NOT NULL,
    "actualStartDate" DATETIME NOT NULL,
    "actualEndDate" DATETIME NOT NULL,
    "productionStatus" TEXT NOT NULL,
    "productionPriority" TEXT NOT NULL,
    "workCenter" TEXT NOT NULL,
    "productionSupervisor" TEXT NOT NULL,
    "productionMethod" TEXT NOT NULL,
    "machineUsed" TEXT NOT NULL,
    "laborHours" TEXT NOT NULL,
    "qualityControlChecks" TEXT NOT NULL,
    "scrapOrWaste" TEXT NOT NULL,
    "productionCost" TEXT NOT NULL,
    "productionEfficiency" TEXT NOT NULL,
    "productionNotes" TEXT NOT NULL,
    CONSTRAINT "Production_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
