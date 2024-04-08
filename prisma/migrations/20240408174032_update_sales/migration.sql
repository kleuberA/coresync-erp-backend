/*
  Warnings:

  - Added the required column `companyID` to the `SalesOrder` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SalesOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerID" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "requiredDeliveryDate" DATETIME NOT NULL,
    "salesRepresentative" TEXT NOT NULL,
    "shippingMethod" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "orderTotal" TEXT NOT NULL,
    "discountsApplied" TEXT NOT NULL,
    "itemsOrdered" TEXT NOT NULL,
    "specialInstructions" TEXT NOT NULL,
    "salesOrderSource" TEXT NOT NULL,
    "salesOrderType" TEXT NOT NULL,
    "relatedDocuments" TEXT NOT NULL,
    "shippingTrackingInfo" TEXT NOT NULL,
    "orderCompletionDate" DATETIME NOT NULL,
    CONSTRAINT "SalesOrder_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SalesOrder_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SalesOrder" ("billingAddress", "customerID", "discountsApplied", "id", "itemsOrdered", "orderCompletionDate", "orderDate", "orderStatus", "orderTotal", "paymentStatus", "paymentTerms", "relatedDocuments", "requiredDeliveryDate", "salesOrderSource", "salesOrderType", "salesRepresentative", "shippingAddress", "shippingMethod", "shippingTrackingInfo", "specialInstructions") SELECT "billingAddress", "customerID", "discountsApplied", "id", "itemsOrdered", "orderCompletionDate", "orderDate", "orderStatus", "orderTotal", "paymentStatus", "paymentTerms", "relatedDocuments", "requiredDeliveryDate", "salesOrderSource", "salesOrderType", "salesRepresentative", "shippingAddress", "shippingMethod", "shippingTrackingInfo", "specialInstructions" FROM "SalesOrder";
DROP TABLE "SalesOrder";
ALTER TABLE "new_SalesOrder" RENAME TO "SalesOrder";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
