import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }


    async getProjects() {
        return await this.prisma.project.findMany();
    }
}
