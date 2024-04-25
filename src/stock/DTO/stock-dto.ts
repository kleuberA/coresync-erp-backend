import { IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StockOutputDTO {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    availableQuantity: string;

    @ApiProperty()
    @IsString()
    minimumStockQuantity: string;

    @ApiProperty()
    @IsString()
    maximumStockQuantity: string;

    @ApiProperty()
    @IsString()
    stockLocation: string;

    @ApiProperty()
    @IsDateString()
    entryDate: Date;

    @ApiProperty()
    @IsDateString()
    exitDate: Date;

    @ApiProperty()
    @IsString()
    reasonForStockEntry: string;

    @ApiProperty()
    @IsString()
    reasonForStockRemoval: string;

    @ApiProperty()
    @IsString()
    itemStatus: string;

    @ApiProperty()
    @IsString()
    unitCostPrice: string;

    @ApiProperty()
    @IsString()
    unitSellingPrice: string;

    @ApiProperty()
    @IsString()
    totalStockValue: string;

    @ApiProperty()
    @IsString()
    lotOrSerialNumber: string;

    @ApiProperty()
    @IsDateString()
    expirationDate: Date;

    @ApiProperty()
    @IsString()
    specificStorageConditions: string;

    @ApiProperty()
    @IsString()
    stockMovementHistory: string;

    @ApiProperty()
    @IsString()
    stockController: string;
}
