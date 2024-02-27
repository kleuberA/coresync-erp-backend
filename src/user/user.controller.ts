import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUser } from './DTO/create-user-dto';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

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

    @Post("create")
    async createUser(@Body() createUser: CreateUser, @Res() resp: Response) {
        try {
            await this.userService.createUser(createUser);
            return resp.status(HttpStatus.OK).json({ message: "User created successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create user!", error: error.message });
        }
    }
}
