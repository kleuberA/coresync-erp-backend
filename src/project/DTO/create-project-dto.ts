import { IsBoolean, IsDate, IsDateString, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Project } from "../Entity/project.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProject extends Project {

    @ApiProperty({
        description: 'The name of the project',
        example: 'Project',
        required: true,
        maximum: 50,
        minimum: 3,
    })
    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name should contain only letters (no special characters or numbers)',
    })
    name: string;

    @ApiProperty()
    @IsString()
    companyId: string;

    @ApiProperty()
    @IsDateString()
    start_date: Date;

    @ApiProperty()
    @IsDateString()
    end_date: Date;

    @ApiProperty()
    @IsBoolean()
    active: boolean;

    @ApiProperty()
    @IsString()
    creatorId: string;
}