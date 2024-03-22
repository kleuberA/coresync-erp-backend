import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { User } from "src/user/entity/user.entity";

export class RemoveParticipantMeeting {
    @ApiProperty()
    users: User[];

    @ApiProperty()
    @IsString()
    creatorMeetingId: string

    @ApiProperty()
    userId: [];
}