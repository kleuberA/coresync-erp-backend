import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }

    @IsPublic()
    @Get()
    getProjects(@Res() res: Response) {
        try {
            const projects = this.projectService.getProjects();
            return res.status(HttpStatus.OK).json({ message: 'Projects fetched successfully', data: projects, });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching projects', });
        }
    }
}
