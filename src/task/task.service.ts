import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTask } from './DTO/create-task-dto';
import { Injectable } from '@nestjs/common';
import { UpdateTask } from './DTO/update-task-dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        const allTasks = await this.prisma.task.findMany();
        return allTasks;
    }

    async findTaskById(taskId: string) {
        const task = await this.getTask(taskId);
        return task;
    }

    async findTaskByProject(projectId: string): Promise<Task[]> {
        const tasks = await this.prisma.task.findMany({
            where: {
                projectId: projectId
            }
        });

        if (tasks.length === 0) throw new Error('Tasks not found.');

        return tasks;
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

        await this.permissionUser(createTaskData.creatorId, existProject.companyId);

        const newTask = await this.prisma.task.create({
            data: {
                ...createTaskData,
            }
        });

        return newTask;

    }

    async deleteTask(taskId: string) {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId
            }
        });

        if (!task) throw new Error('Task not found.');

        const project = await this.prisma.project.findUnique({
            where: {
                id: task.projectId
            }
        })

        await this.permissionUser(task.creatorId, project.companyId);

        return await this.prisma.task.delete({
            where: {
                id: taskId
            }
        });
    }

    async updateTask(taskId: string, updateTaskData: UpdateTask) {
        const task = await this.getTask(taskId);

        const project = await this.prisma.project.findUnique({
            where: {
                id: task.projectId
            }
        })

        await this.permissionUser(task.creatorId, project.companyId);

        return await this.prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                ...updateTaskData
            }
        });
    }

    async getTask(taskId: string): Promise<Task> {
        const task = await this.prisma.task.findUnique({
            where: {
                id: taskId
            }
        });

        if (!task) throw new Error('Task not found.');

        return task;
    }

    async permissionUser(userId: string, companyId: string) {
        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: userId,
                companyId: companyId
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
    }

}