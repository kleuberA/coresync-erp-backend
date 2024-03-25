import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    userId: string;

    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsString()
    type: string;

    @IsString()
    fiscalCode: string;

    @IsDateString()
    registrationDate: Date;

    @IsNumber()
    creditLimit: number;

    @IsString()
    paymentTerms: string;

    @IsString()
    purchaseHistory: string;

    @IsString()
    contactInformation: string;

    @IsString()
    classification: string;

    @IsBoolean()
    status: boolean;

    @IsString()
    references: string;

    @IsString()
    geographicLocation: string;

    @IsString()
    preferences: string;

    @IsString()
    supportHistory: string;

    @IsString()
    companyId: string;
}