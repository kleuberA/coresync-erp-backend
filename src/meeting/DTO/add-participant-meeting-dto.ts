import { User } from "src/user/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddParticipantMeeting {
    @ApiProperty()
    users: User[];

    @ApiProperty()

    userId: [];
}