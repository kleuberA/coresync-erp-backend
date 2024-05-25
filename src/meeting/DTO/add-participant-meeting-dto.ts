import { User } from "src/user/entity/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class AddParticipantMeeting {
    @ApiProperty()
    users: User[];

    @ApiProperty()
    userId: [];
}