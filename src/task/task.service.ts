import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTask } from './DTO/create-task-dto';
import { TaskStatus } from './entity/task.entity';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        const allTasks = await this.prisma.task.findMany();
        return allTasks;
    }

    async createTask(createTaskData: CreateTask): Promise<CreateTask> {

        const existProjectPromise = this.prisma.project.findUnique({
            where: {
                id: createTaskData.projectId
            }
        })

        const existAssigneePromise = this.prisma.user.findUnique({
            where: {
                id: createTaskData.assigneeId
            }
        })

        const existCreatorPromise = this.prisma.user.findUnique({
            where: {
                id: createTaskData.creatorId
            }
        })

        const [existProject, existAssignee, existCreator] = await Promise.all([existProjectPromise, existAssigneePromise, existCreatorPromise]);

        if (!existProject) throw new Error('Project not found.');
        if (!existAssignee) throw new Error('Assignee not found.');
        if (!existCreator) throw new Error('Creator not found.');

        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: createTaskData.creatorId,
                companyId: existProject.companyId
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company'
                    }
                }
            }
        });

        if (!userPermission) throw new Error('User not authorized to create task.');

        const newTask = await this.prisma.task.create({
            data: {
                ...createTaskData,
            }
        });

        return newTask;

    }

}