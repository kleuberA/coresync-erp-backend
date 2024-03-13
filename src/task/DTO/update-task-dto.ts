import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateTask {

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MinLength(3, { message: "Name must be at least 3 characters long" })
    @MaxLength(50, { message: "Name must be at most 50 characters long!" })
    name?: string;

    // projectId: string;
    // assigneeId: string;
    // creatorId: string;

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
    @IsOptional()
    status?: string;

}