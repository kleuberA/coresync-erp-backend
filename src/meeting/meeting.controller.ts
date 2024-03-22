import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { MeetingService } from './meeting.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateMeeting } from './DTO/create-meeting-dto';

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

    @Post("create")
    async createMeeting(@Res() res: Response, @Body() createMeeting: CreateMeeting) {
        try {
            const meetings = await this.meetingService.createMeeting(createMeeting);
            return res.status(HttpStatus.OK).json({ message: 'Meetings created successfully!', data: meetings })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while creating meeting.', error: error.message })
        }
    }

    @Patch("update/addparticipant/:id")
    async addParticipantMeeting(@Res() res: Response, @Param('id') id: string, @Body() meetingData) {
        try {
            const meetings = await this.meetingService.addParticipantMeeting(id, meetingData);
            return res.status(HttpStatus.OK).json({ message: 'Participant added successfully!', data: meetings })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while adding participant.', error: error.message })
        }
    }

    @Delete("delete/:id/:userId")
    async deleteMeeting(@Res() res: Response, @Param('id') id: string, @Param('userId') userId: string) {
        try {
            const meetings = await this.meetingService.deleteMeeting(id, userId);
            return res.status(HttpStatus.OK).json({ message: 'Meeting deleted successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while deleting meeting.', error: error.message })
        }
    }

}