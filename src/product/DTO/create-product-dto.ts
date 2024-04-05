import { IsDateString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProduct {

    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    name: string;

    @IsString()
    @MinLength(3, { message: 'Detailed description is too short' })
    @MaxLength(200, { message: 'Detailed description is too long' })
    detailedDescription: string;

    @IsString()
    unitOfMeasure: string;

    @IsString()
    weight: string;

    @IsString()
    dimensions: string;

    @IsString()
    stock: string;

    @IsDateString()
    manufactureDate: Date;

    @IsDateString()
    expirationDate: Date;

    @IsString()
    purchase: string;

    @IsString()
    selling: string;

    @IsString()
    profit: string;

    @IsString()
    minimumOrderQuantity: string;

    @IsString()
    minimumStockQuantity: string;

    @IsString()
    maximumStockQuantity: string;

    @IsString()
    replenishment: string;

    @IsString()
    supplierId: string;

    @IsString()
    userId: string;
}