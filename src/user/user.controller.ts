import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CreateUser } from './DTO/create-user-dto';
import { UserService } from './user.service';
import { Response } from 'express';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @IsPublic()
    @Get()
    async getUsers(@Res() resp: Response) {
        try {
            const users = await this.userService.getUsers();
            return resp.status(HttpStatus.OK).json({ message: "Users fetched successfully!", data: users });
        }
        catch (err) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch users!", error: err.message });
        }
    }

    @IsPublic()
    @Post("create")
    async createUser(@Body() createUser: CreateUser, @Res() resp: Response) {
        try {
            await this.userService.createUser(createUser);
            return resp.status(HttpStatus.OK).json({ message: "User created successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create user!", error: error.message });
        }
    }

    @Delete("delete/:id")
    async deleteUser(@Param() params, @Res() resp: Response) {
        try {
            await this.userService.deleteUser(params.id);
            return resp.status(HttpStatus.OK).json({ message: "User deleted successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete user!", error: error.message });
        }
    }
}
