import { ApiProperty } from "@nestjs/swagger";

export class ProjectOutputDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    creatorId: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    end_date: Date;

    @ApiProperty()
    start_date: Date;

    @ApiProperty()
    companyId: string;
}