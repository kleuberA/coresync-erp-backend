import { IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../entity/role.entity";

export class CreateRole extends Role {

    @IsString()
    userId: string;

    @IsString()
    @MinLength(3, { message: "Role name must be at least 3 characters long!" })
    @MaxLength(50, { message: "Role name must be at most 50 characters long!" })
    name: string;

    @IsString()
    companyId: string;
}