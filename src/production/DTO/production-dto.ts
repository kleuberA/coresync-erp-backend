export class ProductionOutputDTO {
    id: string;
    productId: string;
    billOfMaterials: string;
    productionQuantity: string;
    scheduledStartDate: Date;
    scheduledEndDate: Date;
    actualStartDate: Date;
    actualEndDate: Date;
    productionStatus: string;
    productionPriority: string;
    workCenter: string;
    productionSupervisor: string;
    productionMethod: string;
    machineUsed: string;
    laborHours: string;
    qualityControlChecks: string;
    scrapOrWaste: string;
    productionCost: string;
    productionEfficiency: string;
    productionNotes: string;
}