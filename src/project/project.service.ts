import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProject } from './DTO/create-project-dto';
import { Injectable } from '@nestjs/common';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { ProjectOutputDto } from './DTO/project-dto';
import { Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { GetProjectFilter } from './GetProjectFilter';

@Injectable()
export class ProjectService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaProjects = this.prisma.project;

    async getProjects(filters: GetProjectFilter): Promise<PaginatedOutputDto<ProjectOutputDto>> {

        const where: Prisma.ProjectFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<ProjectOutputDto, Prisma.ProjectFindManyArgs>(
            this.prismaProjects,
            {
                where,
                orderBy: {
                    id: 'desc',
                },
            },
            {
                page: filters.page ?? 1,
            },
        );

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

    async getProjectById(projectId: string) {
        return await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });
    }

}