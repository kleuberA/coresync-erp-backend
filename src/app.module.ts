import { CompanyController } from './company/company.controller';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';
import { UserController } from './user/user.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './user/user.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { Bcrypt } from './lib/Bcrypt';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CompanyModule, RoleModule],
  controllers: [AppController, UserController, CompanyController],
  providers: [AppService, UserService, Bcrypt, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, CompanyService],
})
export class AppModule { }
