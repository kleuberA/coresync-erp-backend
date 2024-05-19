import { IsDateString, IsString } from "class-validator";

export class CreateProductionDTO {

    @IsString()
    productId: string;

    @IsString()
    billOfMaterials: string;

    @IsString()
    productionQuantity: string;

    @IsString()
    scheduledStartDate: Date;

    @IsString()
    scheduledEndDate: Date;

    @IsDateString()
    actualStartDate: Date;

    @IsDateString()
    actualEndDate: Date;

    @IsString()
    productionStatus: string;

    @IsString()
    productionPriority: string;

    @IsString()
    workCenter: string;

    @IsString()
    productionSupervisor: string;

    @IsString()
    productionMethod: string;

    @IsString()
    machineUsed: string;

    @IsString()
    laborHours: string;

    @IsString()
    qualityControlChecks: string;

    @IsString()
    scrapOrWaste: string;

    @IsString()
    productionCost: string;

    @IsString()
    productionEfficiency: string;

    @IsString()
    productionNotes: string;
}