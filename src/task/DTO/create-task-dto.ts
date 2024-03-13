import { IsBoolean, IsDateString, IsString } from "class-validator";
import { Task } from "../entity/task.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTask extends Task {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    projectId: string;

    @ApiProperty()
    @IsString()
    assigneeId: string;

    @ApiProperty()
    @IsString()
    creatorId: string;

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
    status: string;

}