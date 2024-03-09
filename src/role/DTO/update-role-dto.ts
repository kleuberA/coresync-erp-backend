import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRole {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    companyId: string

    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

}