import { IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCRMDTO {

    @ApiProperty()
    @IsString()
    customerID: string;

    @ApiProperty()
    @IsString()
    customerName?: string;

    @ApiProperty()
    @IsString()
    customerType?: string;

    @ApiProperty()
    @IsString()
    marketSegment?: string;

    @ApiProperty()
    @IsDateString()
    creationDate?: Date;

    @ApiProperty()
    @IsDateString()
    lastInteraction?: Date;

    @ApiProperty()
    @IsString()
    purchaseHistory?: string;

    @ApiProperty()
    @IsString()
    customerPreferences?: string;

    @ApiProperty()
    @IsString()
    revenuePotential?: string;

    @ApiProperty()
    @IsString()
    customerStatus?: string;

    @ApiProperty()
    @IsString()
    notes?: string;

    @ApiProperty()
    @IsString()
    associatedCampaigns?: string;

    @ApiProperty()
    @IsString()
    customerFeedback?: string;

    @ApiProperty()
    @IsString()
    touchpoints?: string;

    @ApiProperty()
    @IsString()
    responsibleDepartment?: string;

    @ApiProperty()
    @IsDateString()
    customerBirthday?: Date;

    @ApiProperty()
    @IsString()
    customerRating?: string;

    @ApiProperty()
    @IsString()
    supportHistory?: string;

    @ApiProperty()
    @IsString()
    contactNetwork?: string;

    @ApiProperty()
    @IsString()
    communicationPreferences?: string;

    @ApiProperty()
    @IsString()
    visitHistory?: string;

    @ApiProperty()
    @IsString()
    financialSituation?: string;

    @ApiProperty()
    @IsString()
    customerInterests?: string;

    @ApiProperty()
    @IsString()
    associatedDocumentation?: string;

    @ApiProperty()
    @IsString()
    customerLifecycleStage?: string;
}