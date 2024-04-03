-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "detailedDescription" TEXT NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "dimensions" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SalesHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "quantity" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "SalesHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CommentsOrNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "comment" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "CommentsOrNotes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CategoriesToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CategoriesToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CategoriesToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesToProduct_AB_unique" ON "_CategoriesToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesToProduct_B_index" ON "_CategoriesToProduct"("B");
