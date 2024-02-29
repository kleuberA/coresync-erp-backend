import { User } from "src/user/entity/user.entity";
import { Address } from "./address.entity";

export class Company {
    id: string;
    name: string;
    phone: string;
    users: User[];
    address: Address;
}
