import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateProject } from './DTO/create-project-dto';
import { GetProjectFilter } from './GetProjectFilter';
import { ProjectOutputDto } from './DTO/project-dto';
import { ProjectService } from './project.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @IsPublic()
    @ApiPaginatedResponse(ProjectOutputDto)
    @Get()
    async getProjects(@Res() res: Response, @Req() req: Request, @Query() filters: GetProjectFilter) {
        try {
            const projects = await this.projectService.getProjects(filters);
            return res.status(HttpStatus.OK).json({ message: 'Projects fetched successfully', data: projects });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching projects', error: error.message });
        }
    }

    @ApiBody({ type: CreateProject })
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
    async getOneProject(@Param('id') projectId: string, @Res() res: Response) {
        try {
            const project = await this.projectService.getProjectById(projectId);
            return res.status(HttpStatus.OK).json({ message: 'Project fetched successfully', data: project });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching project', error: error.message });
        }
    }

    @Delete("delete/:id")
    async deleteProject(@Param('id') projectId: string, @Res() res: Response, @Body() id: { userId: string }) {
        try {
            const project = await this.projectService.deleteProject(projectId, id.userId);
            return res.status(HttpStatus.OK).json({ message: 'Project deleted successfully' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while deleting project', error: error.message });
        }
    }

}
