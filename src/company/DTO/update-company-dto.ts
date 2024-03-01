import { IsOptional, IsString } from "class-validator";
import { AddressCompany } from "./address-company-dto";

export class UpdateCompany {

    @IsString()
    idUser: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    address?: AddressCompany;
}