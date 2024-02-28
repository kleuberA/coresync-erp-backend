import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUser } from './DTO/create-user-dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UpdateUser } from './DTO/update-user-dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async getUsers() {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            }
        });
        return users;
    }

    async createUser(createUser: CreateUser) {

        const userExist = await this.prisma.user.findUnique({
            where: {
                email: createUser.email
            }
        });

        if (userExist) {
            throw new Error("User already exists!");
        }

        let newPassword = await bcrypt.hash(createUser.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: createUser.name,
                email: createUser.email,
                password: newPassword
            }
        });
        return user;
    }

    async updateUser(id: string, updateUser: UpdateUser) {

        const userExist = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!userExist) {
            throw new BadRequestException("User does not exist!");
        }

        if (updateUser.password) {
            updateUser.password = await bcrypt.hash(updateUser.password, 10);
        }

        return await this.prisma.user.update({
            where: {
                id: id
            },
            data: {
                name: updateUser.name,
                email: updateUser.email,
                password: updateUser.password
            }
        })
    }

    async deleteUser(id: string): Promise<User> {

        const userExist = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!userExist) {
            throw new BadRequestException("User does not exist!");
        }

        return await this.prisma.user.delete({
            where: {
                id: id
            }
        })
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
