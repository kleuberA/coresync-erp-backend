import { User } from "src/user/entity/user.entity";
import { Meeting } from "../entity/meeting.entity";
import { IsDateString, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMeeting extends Meeting {

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: 'Name is too short.' })
    @MaxLength(50, { message: 'Name is too long.' })
    name: string;

    @ApiProperty()
    @IsString()
    projectId: string;

    @ApiProperty()
    @IsString()
    creatorId: string;

    @ApiProperty()
    @IsDateString()
    start_date: Date;

    @ApiProperty()
    users: User[];
}
