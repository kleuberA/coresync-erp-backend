import { IsDateString, IsString } from "class-validator";

export class SalesOrderOutputDTO {

    @IsString()
    customerID: string;

    @IsString()
    companyID: string;

    @IsDateString()
    orderDate: Date;

    @IsDateString()
    requiredDeliveryDate: Date;

    @IsString()
    salesRepresentative: string;

    @IsString()
    shippingMethod: string;

    @IsString()
    shippingAddress: string;

    @IsString()
    billingAddress: string;

    @IsString()
    orderStatus: string;

    @IsString()
    paymentTerms: string;

    @IsString()
    paymentStatus: string;

    @IsString()
    orderTotal: string;

    @IsString()
    discountsApplied: string;

    @IsString()
    itemsOrdered: string;

    @IsString()
    specialInstructions: string;

    @IsString()
    salesOrderSource: string;

    @IsString()
    salesOrderType: string;

    @IsString()
    relatedDocuments: string;

    @IsString()
    shippingTrackingInfo: string;

    @IsDateString()
    orderCompletionDate: Date;
}