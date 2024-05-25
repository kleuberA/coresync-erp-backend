import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCustomerDTO {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    fiscalCode: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    creditLimit?: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    paymentTerms?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    purchaseHistory?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    contactInformation?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    classification?: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    status?: boolean;

    @ApiProperty()
    @IsOptional()
    @IsString()
    references?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    geographicLocation?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    preferences?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    supportHistory?: string;
}
