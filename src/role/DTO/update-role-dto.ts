import { IsOptional, IsString } from "class-validator";

export class UpdateRole {

    @IsString()
    userId: string;

    @IsString()
    companyId: string

    @IsString()
    roleId: string

    @IsOptional()
    @IsString()
    name: string;

}