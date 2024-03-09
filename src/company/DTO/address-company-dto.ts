import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AddressCompany {

    @ApiProperty()
    @IsOptional()
    @IsString()
    street?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    state?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    zip?: string;
}
