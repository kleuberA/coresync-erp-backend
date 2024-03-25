import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateCustomerDto } from './DTO/create-customer-dto';
import { CustomerService } from './customer.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Customer")
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async getAllCustomers(@Res() resp: Response) {
        try {
            const customers = await this.customerService.getAllCustomers();
            resp.status(HttpStatus.OK).json({ message: "Customers fetched successfully!", data: customers })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch customers!", error: error.message });
        }
    }

    @Get('/:id')
    async getCustomerById(@Res() resp: Response, @Param("id") id: string) {
        try {
            const customer = await this.customerService.getCustomerById(id);
            resp.status(HttpStatus.OK).json({ message: "Customer fetched successfully!", data: customer })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch customer!", error: error.message });
        }
    }

    @Post("/create")
    async createCustomer(@Res() resp: Response, @Body() createCustomerData: CreateCustomerDto) {
        try {
            const customer = await this.customerService.createCustomer(createCustomerData);
            resp.status(HttpStatus.OK).json({ message: "Customer created successfully!", data: customer })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create customer!", error: error.message });
        }
    }
}
