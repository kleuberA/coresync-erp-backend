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
import { ProjectService } from './project/project.service';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { MeetingService } from './meeting/meeting.service';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingModule } from './meeting/meeting.module';
import { NotificationsGateway } from './notifications/notifications.gateway';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { CustomerModule } from './customer/customer.module';
import { SupplierController } from './supplier/supplier.controller';
import { SupplierService } from './supplier/supplier.service';
import { SupplierModule } from './supplier/supplier.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { SalesorderService } from './salesorder/salesorder.service';
import { SalesorderController } from './salesorder/salesorder.controller';
import { SalesorderModule } from './salesorder/salesorder.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, CompanyModule, RoleModule, ProjectModule, TaskModule, MeetingModule, CustomerModule, SupplierModule, ProductModule, SalesorderModule],
  controllers: [AppController, UserController, CompanyController, ProjectController, TaskController, MeetingController, CustomerController, SupplierController, SalesorderController],
  providers: [AppService, UserService, Bcrypt, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, CompanyService, ProjectService, TaskService, MeetingService, NotificationsGateway, CustomerService, SupplierService, ProductService, SalesorderService],
})
export class AppModule { }
