import { IsDateString, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSalesOrderDTO {

    @ApiProperty()
    @IsString()
    customerID: string;

    @ApiProperty()
    @IsString()
    companyID: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    orderDate?: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    requiredDeliveryDate?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    salesRepresentative?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    shippingMethod?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    shippingAddress?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    billingAddress?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    orderStatus?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paymentTerms?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paymentStatus?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    orderTotal?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    discountsApplied?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    itemsOrdered?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    specialInstructions?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    salesOrderSource?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    salesOrderType?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    relatedDocuments?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    shippingTrackingInfo?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    orderCompletionDate?: Date;

    @ApiProperty()
    @IsString()
    userId: string;
}