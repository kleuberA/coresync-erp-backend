import { Injectable } from '@nestjs/common';
import { Meeting } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MeetingService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllMeetings(): Promise<Meeting[]> {
        const meetings = await this.prisma.meeting.findMany();
        return meetings;
    }

    async getMeetingById(idMetting: string): Promise<Meeting> {
        const meeting = await this.prisma.meeting.findUnique({
            where: {
                id: idMetting
            }
        });

        if (!meeting) throw new Error('Meeting not found');

        return meeting;
    }

    async getYourMeetings(userId: string): Promise<Meeting[]> {
        const meetings = await this.prisma.meeting.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        });

        return meetings;
    }

}
