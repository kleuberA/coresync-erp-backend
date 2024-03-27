import { IsDateString, IsEmail, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Supplier {

    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Company name is too short.' })
    @MaxLength(50, { message: 'Company name is too long.' })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name should contain only letters (no special characters or numbers)',
    })
    companyName: string;

    @ApiProperty()
    @IsString()
    contactPerson: string;

    @ApiProperty()
    @IsString()
    contactTitle: string;

    @ApiProperty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email address.' })
    contactEmail: string;

    @ApiProperty()
    @IsString()
    @IsPhoneNumber('BR', { message: 'Invalid phone number.' })
    contactPhone: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsString()
    paymentTerms: string;

    @ApiProperty()
    @IsString()
    leadTime: string;

    @ApiProperty()
    @IsString()
    minimumOrderQuantity: string;

    @ApiProperty()
    @IsString()
    preferredCommunicationMethod: string;

    @ApiProperty()
    @IsString()
    supplierRating: string;

    @ApiProperty()
    @IsString()
    supplierCategory: string;

    @ApiProperty()
    @IsString()
    certifications: string;

    @ApiProperty()
    @IsDateString()
    contractExpiryDate: Date;

    @ApiProperty()
    @IsString()
    bankingInformation: string;

    @ApiProperty()
    @IsString()
    taxIdentificationNumber: string;

    @ApiProperty()
    @IsString()
    discounts: string;

    @ApiProperty()
    @IsString()
    notesOrComments: string;

    @ApiProperty()
    @IsString()
    companyId: string;
}