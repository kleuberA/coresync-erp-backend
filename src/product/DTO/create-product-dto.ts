import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProduct {

    @ApiProperty({
        description: 'Name of the product',
        type: 'string',
        required: true,
        example: 'Product Name'
    })
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    name: string;

    @ApiProperty({
        description: 'Short description of the product',
        type: 'string',
        required: true,
        example: 'Short Description'
    })
    @IsString()
    @MinLength(3, { message: 'Detailed description is too short' })
    @MaxLength(200, { message: 'Detailed description is too long' })
    detailedDescription: string;

    @ApiProperty()
    @IsString()
    unitOfMeasure: string;

    @ApiProperty()
    @IsString()
    weight: string;

    @ApiProperty()
    @IsString()
    dimensions: string;

    @ApiProperty()
    @IsString()
    stock: string[];

    @ApiProperty()
    @IsDateString()
    manufactureDate: Date;

    @ApiProperty()
    @IsDateString()
    expirationDate: Date;

    @ApiProperty()
    @IsString()
    purchase: string;

    @ApiProperty()
    @IsString()
    selling: string;

    @ApiProperty()
    @IsString()
    profit: string;

    @ApiProperty()
    @IsString()
    minimumOrderQuantity: string;

    @ApiProperty()
    @IsString()
    minimumStockQuantity: string;

    @ApiProperty()
    @IsString()
    maximumStockQuantity: string;

    @ApiProperty()
    @IsString()
    replenishment: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    supplierId: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty({ type: [String] })
    categories: string[];

    @ApiProperty({ type: [String] })
    salesHistory: string[];

    @ApiProperty({ type: [String] })
    commentsOrNotes: string[];

    @ApiProperty({ type: [String] })
    production: string[];

}