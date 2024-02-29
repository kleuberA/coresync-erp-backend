import { IsObject, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/entity/user.entity";
import { Address } from "../entity/address.entity";
import { Company } from "../entity/company.entity";

export class CreateCompany extends Company {

    @IsString()
    @MaxLength(50, { message: "Company name is too long!" })
    @MinLength(3, { message: "Company name is too short!" })
    name: string;

    @IsString()
    @IsPhoneNumber("BR", { message: "Invalid phone number!" })
    phone: string;

    users: User[];

    @IsObject()
    address: Address;
}
