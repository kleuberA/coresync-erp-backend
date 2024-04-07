import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProductDTO {

    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    name?: string;

    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'Detailed description is too short' })
    @MaxLength(200, { message: 'Detailed description is too long' })
    detailedDescription?: string;

    @IsOptional()
    @IsString()
    unitOfMeasure?: string;

    @IsOptional()
    @IsString()
    weight?: string;

    @IsOptional()
    @IsString()
    dimensions?: string;

    @IsOptional()
    @IsString()
    stock?: string;

    @IsOptional()
    @IsDateString()
    manufactureDate?: Date;

    @IsOptional()
    @IsDateString()
    expirationDate?: Date;

    @IsOptional()
    @IsString()
    purchase?: string;

    @IsOptional()
    @IsString()
    selling?: string;

    @IsOptional()
    @IsString()
    profit?: string;

    @IsOptional()
    @IsString()
    minimumOrderQuantity?: string;

    @IsOptional()
    @IsString()
    minimumStockQuantity?: string;

    @IsOptional()
    @IsString()
    maximumStockQuantity?: string;

    @IsOptional()
    @IsString()
    replenishment?: string;

    @IsString()
    supplierId?: string;

    @IsString()
    userId?: string;
}