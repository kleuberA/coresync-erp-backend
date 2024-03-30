import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    type: string;

    @ApiProperty()
    @IsString()
    fiscalCode: string;

    @ApiProperty()
    @IsDateString()
    registrationDate: Date;

    @ApiProperty()
    @IsNumber()
    creditLimit: number;

    @ApiProperty()
    @IsString()
    paymentTerms: string;

    @ApiProperty()
    @IsString()
    purchaseHistory: string;

    @ApiProperty()
    @IsString()
    contactInformation: string;

    @ApiProperty()
    @IsString()
    classification: string;

    @ApiProperty()
    @IsBoolean()
    status: boolean;

    @ApiProperty()
    @IsString()
    references: string;

    @ApiProperty()
    @IsString()
    geographicLocation: string;

    @ApiProperty()
    @IsString()
    preferences: string;

    @ApiProperty()
    @IsString()
    supportHistory: string;

    @ApiProperty()
    @IsString()
    companyId: string;
}