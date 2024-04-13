import { IsDateString, IsOptional, IsString } from "class-validator";

export class UpdateSalesOrderDTO {

    @IsString()
    customerID: string;

    @IsString()
    companyID: string;

    @IsDateString()
    @IsOptional()
    orderDate?: Date;

    @IsDateString()
    @IsOptional()
    requiredDeliveryDate?: Date;

    @IsString()
    @IsOptional()
    salesRepresentative?: string;

    @IsString()
    @IsOptional()
    shippingMethod?: string;

    @IsString()
    @IsOptional()
    shippingAddress?: string;

    @IsString()
    @IsOptional()
    billingAddress?: string;

    @IsString()
    @IsOptional()
    orderStatus?: string;

    @IsString()
    @IsOptional()
    paymentTerms?: string;

    @IsString()
    @IsOptional()
    paymentStatus?: string;

    @IsString()
    @IsOptional()
    orderTotal?: string;

    @IsString()
    @IsOptional()
    discountsApplied?: string;

    @IsString()
    @IsOptional()
    itemsOrdered?: string;

    @IsString()
    @IsOptional()
    specialInstructions?: string;

    @IsString()
    @IsOptional()
    salesOrderSource?: string;

    @IsString()
    @IsOptional()
    salesOrderType?: string;

    @IsString()
    @IsOptional()
    relatedDocuments?: string;

    @IsString()
    @IsOptional()
    shippingTrackingInfo?: string;

    @IsDateString()
    @IsOptional()
    orderCompletionDate?: Date;

    @IsString()
    userId: string;
}