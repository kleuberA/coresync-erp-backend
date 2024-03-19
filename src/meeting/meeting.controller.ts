import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('meeting')
@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) { }

    @Get()
    async getAllMeetings(@Res() res: Response) {
        try {
            const meetings = await this.meetingService.getAllMeetings();
            return res.status(HttpStatus.OK).json({ message: 'Meetings fetched successfully', data: meetings })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching meetings', error: error.message })
        }
    }

}
