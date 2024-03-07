import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ProjectService } from './project.service';
import { Response } from 'express';
import { CreateProject } from './DTO/create-project-dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @IsPublic()
    @Get()
    getProjects(@Res() res: Response) {
        try {
            const projects = this.projectService.getProjects();
            return res.status(HttpStatus.OK).json({ message: 'Projects fetched successfully', data: projects });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching projects' });
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

}
