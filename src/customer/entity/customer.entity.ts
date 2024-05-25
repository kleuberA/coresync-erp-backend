import { IsDateString } from "class-validator";

export class Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
    type: string;
    fiscalCode: string;
    @IsDateString()
    registrationDate: Date;
    creditLimit: number;
    paymentTerms: string;
    purchaseHistory: string;
    contactInformation: string;
    classification: string;
    status: boolean;
    references: string;
    geographicLocation: string;
    preferences: string;
    supportHistory: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: string;
}