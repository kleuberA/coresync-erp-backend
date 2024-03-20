import { User } from "src/user/entity/user.entity";

export class Meeting {
    id: string;
    name: string;
    projectId: string;
    creatorId: string;
    start_date: Date;
    users: User[];
}