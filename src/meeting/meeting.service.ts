import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeetingService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllMeetings() {
        const meetings = await this.prisma.meeting.findMany();
        return meetings;
    }

}
