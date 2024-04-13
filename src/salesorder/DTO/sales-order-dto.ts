import { IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SalesOrderOutputDTO {

    @ApiProperty()
    @IsString()
    customerID: string;

    @ApiProperty()
    @IsString()
    companyID: string;

    @ApiProperty()
    @IsDateString()
    orderDate: Date;

    @ApiProperty()
    @IsDateString()
    requiredDeliveryDate: Date;

    @ApiProperty()
    @IsString()
    salesRepresentative: string;

    @ApiProperty()
    @IsString()
    shippingMethod: string;

    @ApiProperty()
    @IsString()
    shippingAddress: string;

    @ApiProperty()
    @IsString()
    billingAddress: string;

    @ApiProperty()
    @IsString()
    orderStatus: string;

    @ApiProperty()
    @IsString()
    paymentTerms: string;

    @ApiProperty()
    @IsString()
    paymentStatus: string;

    @ApiProperty()
    @IsString()
    orderTotal: string;

    @ApiProperty()
    @IsString()
    discountsApplied: string;

    @ApiProperty()
    @IsString()
    itemsOrdered: string;

    @ApiProperty()
    @IsString()
    specialInstructions: string;

    @ApiProperty()
    @IsString()
    salesOrderSource: string;

    @ApiProperty()
    @IsString()
    salesOrderType: string;

    @ApiProperty()
    @IsString()
    relatedDocuments: string;

    @ApiProperty()
    @IsString()
    shippingTrackingInfo: string;

    @ApiProperty()
    @IsDateString()
    orderCompletionDate: Date;
}