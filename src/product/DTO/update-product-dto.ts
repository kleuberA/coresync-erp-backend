import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDTO {

    @ApiProperty({
        description: 'Name of the product',
        type: 'string',
        required: false,
        example: 'Product Name'
    })
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    name: string;

    @ApiProperty({
        description: 'Short description of the product',
        type: 'string',
        required: false,
        example: 'Short Description'
    })
    @IsOptional()
    @IsString()
    @MinLength(3, { message: 'Detailed description is too short' })
    @MaxLength(200, { message: 'Detailed description is too long' })
    detailedDescription?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    unitOfMeasure?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    weight?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    dimensions?: string;

    @ApiProperty()
    @IsString()
    stock: string[];

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    manufactureDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    expirationDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    purchase?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    selling?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    profit?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    minimumOrderQuantity?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    minimumStockQuantity?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    maximumStockQuantity?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    replenishment?: string;

    @ApiProperty()
    @IsString()
    supplierId: string;

    @ApiProperty()
    @IsString()
    userId?: string;
}
