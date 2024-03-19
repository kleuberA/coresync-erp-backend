import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Meeting')
@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingService: MeetingService) { }

    @IsPublic()
    @Get()
    async getAllMeetings(@Res() res: Response) {
        try {
            const meetings = await this.meetingService.getAllMeetings();
            return res.status(HttpStatus.OK).json({ message: 'Meetings fetched successfully', data: meetings })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching meetings', error: error.message })
        }
    }

    @IsPublic()
    @Get(':id')
    async getMeetingById(@Res() res: Response, @Param('id') id: string) {
        try {
            const meeting = await this.meetingService.getMeetingById(id);
            return res.status(HttpStatus.OK).json({ message: 'Meeting fetched successfully!', data: meeting })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching meeting.', error: error.message })
        }
    }

    @IsPublic()
    @Get('user/:id')
    async getYourMeetings(@Res() res: Response, @Param('id') id: string) {
        try {
            const meetings = await this.meetingService.getYourMeetings(id);
            return res.status(HttpStatus.OK).json({ message: 'Meetings fetched successfully!', data: meetings })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching meetings.', error: error.message })
        }
    }

}
