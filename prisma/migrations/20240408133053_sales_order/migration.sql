-- CreateTable
CREATE TABLE "SalesOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerID" TEXT NOT NULL,
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
    CONSTRAINT "SalesOrder_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
