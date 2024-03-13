import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateTask } from './DTO/create-task-dto';
import { UpdateTask } from './DTO/update-task-dto';
import { TaskService } from './task.service';
import { Response } from 'express';

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
    @ApiBody({ type: CreateTask })
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
    @ApiBody({ type: UpdateTask })
    @Patch("update/:id")
    async updateTask(@Res() res: Response, @Param('id') taskId: string, @Body() updateTaskData: UpdateTask) {
        try {
            const updateTask = await this.taskService.updateTask(taskId, updateTaskData);
            return res.status(HttpStatus.OK).json({ message: 'Task updated successfully!', data: updateTask });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating task.', error: error.message })
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