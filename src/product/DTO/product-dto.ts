export class ProductOutputDTO {
    id: string;
    name: string;
    detailedDescription: string;
    unitOfMeasure: string;
    weight: string;
    dimensions: string;
    stock: string;
    manufactureDate: Date;
    expirationDate: Date;
    purchase: string;
    selling: string;
    profit: string;
    minimumOrderQuantity: string;
    minimumStockQuantity: string;
    maximumStockQuantity: string;
    replenishment: string;
    // categories: Categories[];
    // salesHistory: SalesHistory[];
    // commentsOrNotes: CommentsOrNotes[];
    supplierId: string;
}