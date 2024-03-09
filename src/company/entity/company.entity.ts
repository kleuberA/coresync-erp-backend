import { User } from "src/user/entity/user.entity";
import { Address } from "./address.entity";
import { ApiProperty } from "@nestjs/swagger";

export class Company {

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    users: User[];

    address: Address;
}
