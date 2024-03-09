import { IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "../entity/role.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRole extends Role {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    @MinLength(3, { message: "Role name must be at least 3 characters long!" })
    @MaxLength(50, { message: "Role name must be at most 50 characters long!" })
    name: string;

    @ApiProperty()
    @IsString()
    companyId: string;
}