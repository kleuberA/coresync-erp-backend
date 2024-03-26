import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateCustomerDTO {

    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    fiscalCode: string;

    @IsOptional()
    @IsNumber()
    creditLimit?: number;

    @IsOptional()
    @IsString()
    paymentTerms?: string;

    @IsOptional()
    @IsString()
    purchaseHistory?: string;

    @IsOptional()
    @IsString()
    contactInformation?: string;

    @IsOptional()
    @IsString()
    classification?: string;

    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @IsOptional()
    @IsString()
    references?: string;

    @IsOptional()
    @IsString()
    geographicLocation?: string;

    @IsOptional()
    @IsString()
    preferences?: string;

    @IsOptional()
    @IsString()
    supportHistory?: string;
}
