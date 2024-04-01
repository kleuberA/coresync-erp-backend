import { IsDateString, IsEmail, IsOptional, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSupplier {

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Company name is too short.' })
    @MaxLength(50, { message: 'Company name is too long.' })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name should contain only letters (no special characters or numbers)',
    })
    @IsOptional()
    companyName?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contactPerson?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    contactTitle?: string;

    @ApiProperty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email address.' })
    @IsOptional()
    contactEmail?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsPhoneNumber('BR', { message: 'Invalid phone number.' })
    contactPhone?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    address?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    paymentTerms?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    leadTime?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    minimumOrderQuantity?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    preferredCommunicationMethod?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    supplierRating?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    supplierCategory?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    certifications?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    contractExpiryDate?: Date;

    @ApiProperty()
    @IsString()
    @IsOptional()
    bankingInformation?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    taxIdentificationNumber?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    discounts?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    notesOrComments?: string;

    @ApiProperty()
    @IsString()
    userId: string;

}