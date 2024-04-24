/*
  Warnings:

  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Stock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productId" TEXT NOT NULL,
    "availableQuantity" TEXT NOT NULL,
    "minimumStockQuantity" TEXT NOT NULL,
    "maximumStockQuantity" TEXT NOT NULL,
    "stockLocation" TEXT NOT NULL,
    "entryDate" DATETIME NOT NULL,
    "exitDate" DATETIME NOT NULL,
    "reasonForStockEntry" TEXT NOT NULL,
    "reasonForStockRemoval" TEXT NOT NULL,
    "itemStatus" TEXT NOT NULL,
    "unitCostPrice" TEXT NOT NULL,
    "unitSellingPrice" TEXT NOT NULL,
    "totalStockValue" TEXT NOT NULL,
    "lotOrSerialNumber" TEXT NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "specificStorageConditions" TEXT NOT NULL,
    "stockMovementHistory" TEXT NOT NULL,
    "stockController" TEXT NOT NULL,
    CONSTRAINT "Stock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "detailedDescription" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "manufactureDate" DATETIME NOT NULL,
    "expirationDate" DATETIME NOT NULL,
    "purchase" TEXT NOT NULL,
    "selling" TEXT NOT NULL,
    "profit" TEXT NOT NULL,
    "minimumOrderQuantity" TEXT NOT NULL,
    "minimumStockQuantity" TEXT NOT NULL,
    "maximumStockQuantity" TEXT NOT NULL,
    "replenishment" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("detailedDescription", "dimensions", "expirationDate", "id", "manufactureDate", "maximumStockQuantity", "minimumOrderQuantity", "minimumStockQuantity", "name", "profit", "purchase", "replenishment", "selling", "supplierId", "unitOfMeasure", "weight") SELECT "detailedDescription", "dimensions", "expirationDate", "id", "manufactureDate", "maximumStockQuantity", "minimumOrderQuantity", "minimumStockQuantity", "name", "profit", "purchase", "replenishment", "selling", "supplierId", "unitOfMeasure", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
