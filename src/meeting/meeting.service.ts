import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeeting } from './DTO/create-meeting-dto';
import { Injectable } from '@nestjs/common';
import { Meeting } from '@prisma/client';

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

    async createMeeting(meetingData: CreateMeeting) {
        const projectExist = await this.prisma.project.findUnique({
            where: {
                id: meetingData.projectId
            }
        })

        if (!projectExist) throw new Error('Project not found.');

        const creatorExist = await this.prisma.user.findUnique({
            where: {
                id: meetingData.creatorId
            }
        })

        if (!creatorExist) throw new Error('Creator not found.');

        const meeting = await this.prisma.meeting.create({
            data: {
                name: meetingData.name,
                start_date: meetingData.start_date,
                creatorId: meetingData.creatorId,
                project: {
                    connect: {
                        id: meetingData.projectId
                    }
                },
                users: {
                    connect: meetingData.users.map(user => {
                        return { id: user.id }
                    })
                }
            }
        });

        return meeting;
    }

}
