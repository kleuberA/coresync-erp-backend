import { IsBoolean, IsDateString, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProjectOutputDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    creatorId: string;

    @ApiProperty()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsDateString()
    end_date: Date;

    @ApiProperty()
    @IsDateString()
    start_date: Date;

    @ApiProperty()
    @IsString()
    companyId: string;
}