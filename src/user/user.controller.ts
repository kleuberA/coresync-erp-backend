import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateUser } from './DTO/create-user-dto';
import { UpdateUser } from './DTO/update-user-dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';

@ApiTags('User')
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
    @ApiBody({ type: CreateUser })
    @Post("create")
    async createUser(@Body() createUser: CreateUser, @Res() resp: Response) {
        try {
            await this.userService.createUser(createUser);
            return resp.status(HttpStatus.OK).json({ message: "User created successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create user!", error: error.message });
        }
    }

    @ApiBody({ type: UpdateUser })
    @Patch("update/:id")
    async updateUser(@Param() params, @Body() updateUser: UpdateUser, @Res() resp: Response) {
        try {
            await this.userService.updateUser(params.id, updateUser);
            return resp.status(HttpStatus.OK).json({ message: "User updated successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update user!", error: error.message });
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
