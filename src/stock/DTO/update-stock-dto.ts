import { IsDateString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStockDTO {

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    availableQuantity?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    minimumStockQuantity?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    maximumStockQuantity?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    stockLocation?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    entryDate?: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    exitDate?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reasonForStockEntry?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reasonForStockRemoval?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    itemStatus?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    unitCostPrice?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    unitSellingPrice?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    totalStockValue?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lotOrSerialNumber?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    expirationDate?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    specificStorageConditions?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    stockMovementHistory?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    stockController?: string;

}