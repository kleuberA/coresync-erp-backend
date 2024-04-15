import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateCommentsOrNotesDTO {

    @ApiProperty()
    @IsDateString()
    date: Date;

    @ApiProperty()
    @IsString()
    comment: string;

    @ApiProperty()
    @IsString()
    productId: string;
}
