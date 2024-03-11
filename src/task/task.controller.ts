import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @IsPublic()
    @Get()
    async findAll(@Res() res: Response) {
        try {
            const allTasks = await this.taskService.findAll();
            return res.status(HttpStatus.OK).json({ message: 'Get all tasks successfully!', data: allTasks });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error getting all tasks.', error: error.message })
        }
    }

}
