import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateCommentsOrNotesDTO {

    @ApiProperty()
    @IsString()
    @IsOptional()
    comment?: string;

}