-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "fiscalCode" TEXT NOT NULL,
    "registrationDate" DATETIME NOT NULL,
    "creditLimit" REAL NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "purchaseHistory" TEXT NOT NULL,
    "contactInformation" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "references" TEXT NOT NULL,
    "geographicLocation" TEXT NOT NULL,
    "preferences" TEXT NOT NULL,
    "supportHistory" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
