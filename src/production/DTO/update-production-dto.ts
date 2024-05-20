import { IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductionDTO {

    @ApiProperty()
    @IsString()
    productId: string;

    @ApiProperty()
    @IsString()
    billOfMaterials: string;

    @ApiProperty()
    @IsString()
    productionQuantity: string;

    @ApiProperty()
    @IsString()
    scheduledStartDate: Date;

    @ApiProperty()
    @IsString()
    scheduledEndDate: Date;

    @ApiProperty()
    @IsDateString()
    actualStartDate: Date;

    @ApiProperty()
    @IsDateString()
    actualEndDate: Date;

    @ApiProperty()
    @IsString()
    productionStatus: string;

    @ApiProperty()
    @IsString()
    productionPriority: string;

    @ApiProperty()
    @IsString()
    workCenter: string;

    @ApiProperty()
    @IsString()
    productionSupervisor: string;

    @ApiProperty()
    @IsString()
    productionMethod: string;

    @ApiProperty()
    @IsString()
    machineUsed: string;

    @ApiProperty()
    @IsString()
    laborHours: string;

    @ApiProperty()
    @IsString()
    qualityControlChecks: string;

    @ApiProperty()
    @IsString()
    scrapOrWaste: string;

    @ApiProperty()
    @IsString()
    productionCost: string;

    @ApiProperty()
    @IsString()
    productionEfficiency: string;

    @ApiProperty()
    @IsString()
    productionNotes: string;

    @ApiProperty()
    @IsString()
    supplierId?: string;

    @ApiProperty()
    @IsString()
    userId?: string;

}