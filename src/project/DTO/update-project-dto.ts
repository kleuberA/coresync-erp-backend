import { IsBoolean, IsDateString, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProject {

    @ApiProperty({
        description: 'The name of the project',
        example: 'Project',
        required: true,
        maximum: 50,
        minimum: 3,
    })
    @IsString()
    @IsOptional()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name should contain only letters (no special characters or numbers)',
    })
    name?: string;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    start_date?: Date;

    @ApiProperty()
    @IsDateString()
    @IsOptional()
    end_date?: Date;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    active?: boolean;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    creatorId?: string;
}