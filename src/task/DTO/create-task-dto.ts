import { IsBoolean, IsDateString, IsEnum, IsString } from "class-validator";
import { Task, TaskStatus } from "../entity/task.entity";

export class CreateTask extends Task {

    @IsString()
    name: string;

    @IsString()
    projectId: string;

    @IsString()
    assigneeId: string;

    @IsString()
    creatorId: string;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;

    @IsBoolean()
    active: boolean;

    @IsString()
    status: string;

}
