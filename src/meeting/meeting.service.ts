import { RemoveParticipantMeeting } from './DTO/remove-participant-meeting-dto';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { AddParticipantMeeting } from './DTO/add-participant-meeting-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMeeting } from './DTO/create-meeting-dto';
import { UpdateMeeting } from './DTO/update-meeting-dto';
import { Injectable } from '@nestjs/common';
import { Meeting } from '@prisma/client';

@Injectable()
export class MeetingService {
    constructor(private readonly prisma: PrismaService, private readonly notificationGateway: NotificationsGateway) { }

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

    async createMeeting(meetingData: CreateMeeting): Promise<Meeting> {
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

        meetingData.users.forEach(user => {
            this.notificationGateway.sendNotification(
                {
                    userId: user.id,
                    message: `You have been invited to the meeting ${meetingData.name}.`
                }
            );
        });

        return meeting;
    }

    async addParticipantMeeting(meetingId: string, participantData: AddParticipantMeeting): Promise<Meeting> {
        const meetingExist = await this.prisma.meeting.findUnique({
            where: {
                id: meetingId
            }
        });

        if (!meetingExist) throw new Error('Meeting not found.');

        const userExist = await this.prisma.user.findMany({
            where: {
                id: {
                    in: participantData.userId
                }
            }
        });

        // if (!userExist) throw new Error('User not found.');
        if (userExist.length !== participantData.userId.length) throw new Error('One or more users not found.');

        const participantExist = await this.prisma.meeting.findFirst({
            where: {
                id: meetingId,
                users: {
                    some: {
                        id: {
                            in: participantData.userId
                        }
                    }
                }
            }
        });

        // if (participantExist) throw new Error('Participant already exist.');
        if (participantExist) throw new Error('One or more participants already exist in the meeting.');

        const participant = await this.prisma.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                users: {
                    connect: participantData.users.map(user => {
                        return { id: user.id }
                    })
                }
            }
        });

        return participant;
    }

    async removeParticipantFromMeeting(meetingId: string, participantData: RemoveParticipantMeeting): Promise<Meeting> {
        const meetingExist = await this.prisma.meeting.findUnique({
            where: {
                id: meetingId
            }
        });

        if (!meetingExist) throw new Error('Meeting not found.');

        const userExist = await this.prisma.user.findMany({
            where: {
                id: {
                    in: participantData.userId
                }
            }
        });

        // if (!userExist) throw new Error('User not found.');
        if (userExist.length !== participantData.userId.length) throw new Error('One or more users not found.');
        if (meetingExist.creatorId !== participantData.creatorMeetingId) throw new Error('You are not the creator of this meeting.');

        const participantExist = await this.prisma.meeting.findFirst({
            where: {
                id: meetingId,
                users: {
                    some: {
                        id: {
                            in: participantData.userId
                        }
                    }
                }
            }
        });

        // if (!participantExist) throw new Error('Participant not exist.');
        if (!participantExist) throw new Error('One or more participants not exist in the meeting.');

        const participant = await this.prisma.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                users: {
                    disconnect: participantData.users.map(user => {
                        return { id: user.id }
                    })
                }
            }
        });

        return participant;
    }

    async updateMeeting(meetingId: string, updateMeetingData: UpdateMeeting) {
        const meetingExist = await this.prisma.meeting.findUnique({
            where: {
                id: meetingId
            }
        });

        if (!meetingExist) throw new Error('Meeting not found.');

        if (meetingExist.creatorId !== updateMeetingData.userId) throw new Error('You are not the creator of this meeting.');

        const meeting = await this.prisma.meeting.update({
            where: {
                id: meetingId
            },
            data: {
                ...updateMeetingData
            }
        });

        return meeting;
    }

    async deleteMeeting(meetingId: string, userId: string): Promise<Meeting> {

        const userExist = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExist) throw new Error('User not found.');

        const meetingExist = await this.prisma.meeting.findUnique({
            where: {
                id: meetingId
            }
        });

        if (!meetingExist) throw new Error('Meeting not found.');

        if (meetingExist.creatorId !== userId) throw new Error('You are not the creator of this meeting.');

        const meeting = await this.prisma.meeting.delete({
            where: {
                id: meetingId
            }
        });

        return meeting;
    }

}