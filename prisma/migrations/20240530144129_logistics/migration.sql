-- CreateTable
CREATE TABLE "Logistics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "shippingDate" DATETIME NOT NULL,
    "estimatedDeliveryDate" DATETIME NOT NULL,
    "actualDeliveryDate" DATETIME NOT NULL,
    "shippingMethod" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "shippingStatus" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "totalWeight" TEXT NOT NULL,
    "totalVolume" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "shippingCost" TEXT NOT NULL,
    "transportInsurance" TEXT NOT NULL,
    "shippingDocumentation" TEXT NOT NULL,
    "cargoConditioning" TEXT NOT NULL,
    "specialTransportRequirements" TEXT NOT NULL,
    "logisticsManager" TEXT NOT NULL,
    "notesOrComments" TEXT NOT NULL,
    "pickupTime" DATETIME NOT NULL,
    "deliveryTime" DATETIME NOT NULL,
    "trackingEvents" TEXT NOT NULL,
    "deliveryConditions" TEXT NOT NULL,
    "receivingPerson" TEXT NOT NULL,
    "transportIncidents" TEXT NOT NULL,
    "freightPaymentMethod" TEXT NOT NULL,
    "freightPaymentDate" DATETIME NOT NULL,
    "qualityCertificates" TEXT NOT NULL,
    "companyID" TEXT NOT NULL,
    "customerID" TEXT NOT NULL,
    CONSTRAINT "Logistics_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Logistics_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Logistics_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);