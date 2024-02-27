import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUser } from './DTO/create-user-dto';
import * as bcrypt from 'bcrypt';

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
}
