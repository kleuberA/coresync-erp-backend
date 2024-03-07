import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProject } from './DTO/create-project-dto';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }


    async getProjects() {
        return await this.prisma.project.findMany();
    }

    async createProject(createProjectData: CreateProject) {
        const userExistPromise = this.prisma.user.findUnique({
            where: {
                id: createProjectData.creatorId,
            },
        });

        const existCompanyPromise = this.prisma.company.findUnique({
            where: {
                id: createProjectData.companyId,
            },
        });

        try {
            const [userExist, existCompany] = await Promise.all([
                userExistPromise,
                existCompanyPromise,
            ]);

            if (!userExist) {
                throw new Error('User does not exist');
            }

            if (!existCompany) {
                throw new Error('Company does not exist');
            }

            return await this.prisma.project.create({
                data: { ...createProjectData }
            });

        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

}