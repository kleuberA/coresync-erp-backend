import { ApiProperty } from "@nestjs/swagger";
import { Company } from "./company.entity";

export class Address {

    @ApiProperty()
    id: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    zip: string;

    @ApiProperty()
    company: Company;

    @ApiProperty()
    companyId: string;
}