import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateTask } from './DTO/create-task-dto';

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
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error getting all tasks.', error: error.message })
        }
    }

    @IsPublic()
    @Post("create")
    async createTask(@Body() createTask: CreateTask, @Res() resp: Response) {
        try {
            const task = await this.taskService.createTask(createTask);
            return resp.status(HttpStatus.CREATED).json({ message: 'Task created successfully!', data: task });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating task.', error: error.message })
        }
    }

    @IsPublic()
    @Delete("delete/:id")
    async deleteTask(@Res() res: Response, @Param('id') taskId: string) {
        try {
            await this.taskService.deleteTask(taskId);
            return res.status(HttpStatus.OK).json({ message: 'Task deleted successfully!' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error deleting task.', error: error.message })
        }
    }

}