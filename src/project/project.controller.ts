import { Body, Controller, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ProjectService } from './project.service';
import { Request, Response } from 'express';
import { CreateProject } from './DTO/create-project-dto';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { ProjectOutputDto } from './DTO/project-dto';
import { GetProjectFilter } from './GetProjectFilter';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @IsPublic()
    @ApiPaginatedResponse(ProjectOutputDto)
    @Get()
    async getProjects(@Res() res: Response, @Req() req: Request, @Query() filters: GetProjectFilter) {
        try {
            console.log(filters);
            const projects = await this.projectService.getProjects(filters);
            return res.status(HttpStatus.OK).json({ message: 'Projects fetched successfully', data: projects });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching projects', error: error.message });
        }
    }

    @IsPublic()
    @Post("create")
    async createProject(@Res() res: Response, @Body() createProjectData: CreateProject) {
        try {
            const project = await this.projectService.createProject(createProjectData);
            return res.status(HttpStatus.CREATED).json({ message: 'Project created successfully', data: project });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while creating project', error: error.message });
        }
    }

    @IsPublic()
    @Get(":id")
    getOneProject(@Param('id') projectId: string, @Res() res: Response) {
        console.log(projectId);
    }

}
