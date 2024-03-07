import { IsBoolean, IsDate, IsDateString, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Project } from "../Entity/project.entity";

export class CreateProject extends Project {

    @IsString()
    @MinLength(3, { message: 'Name is too short' })
    @MaxLength(50, { message: 'Name is too long' })
    @Matches(/^[a-zA-Z]+$/, {
        message: 'Name should contain only letters (no special characters or numbers)',
    })
    name: string;

    @IsString()
    companyId: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;

    @IsBoolean()
    active: boolean;

    @IsString()
    creatorId: string;
}