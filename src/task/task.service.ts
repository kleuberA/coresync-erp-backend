import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        const allTasks = await this.prisma.task.findMany();
        return allTasks;
    }


}
