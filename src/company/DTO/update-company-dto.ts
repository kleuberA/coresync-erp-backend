import { IsOptional, IsString } from "class-validator";
import { AddressCompany } from "./address-company-dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCompany {

    @ApiProperty()
    @IsString()
    idUser: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsOptional()
    address?: AddressCompany;
}