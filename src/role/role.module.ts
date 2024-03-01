import { PrismaService } from 'src/prisma/prisma.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [RoleService, PrismaService],
  controllers: [RoleController],
})
export class RoleModule { }
