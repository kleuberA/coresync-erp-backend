import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProject } from './DTO/create-project-dto';
import { UpdateProject } from './DTO/update-project-dto';
import { GetProjectFilter } from './GetProjectFilter';
import { ProjectOutputDto } from './DTO/project-dto';
import { createPaginator } from 'prisma-pagination';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

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
                throw new Error('User does not exist.');
            }

            if (!existCompany) {
                throw new Error('Company does not exist.');
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

    async deleteProject(projectId: string, userId: string) {

        const existProject = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        })

        if (!existProject) {
            throw new Error('Project does not exist.');
        }

        if (existProject.creatorId !== userId) {
            throw new Error('You are not allowed to delete this project.');
        }

        return await this.prisma.project.delete({
            where: {
                id: projectId,
            },
        });
    }

    async updateProject(projectId: string, updateProject: UpdateProject) {
        const existProject = await this.prisma.project.findUnique({
            where: {
                id: projectId
            }
        })

        if (!existProject) throw new Error('Project does not exist.');

        if (updateProject.userId && updateProject.userId !== existProject.creatorId) throw new Error('You are not allowed to update this project.');

        const { userId, ...updatedData } = updateProject;

        return await this.prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                ...updatedData
            }
        })

    }
}