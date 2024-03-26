import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateCustomerDto } from './DTO/create-customer-dto';
import { CustomerService } from './customer.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateCustomerDTO } from './DTO/update-customer-dto';

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

    @Patch("/update/:id")
    async updateCustomer(@Res() resp: Response, @Param("id") id: string, @Body() updateCustomerData: UpdateCustomerDTO) {
        try {
            const customer = await this.customerService.updateCustomer(id, updateCustomerData);
            resp.status(HttpStatus.OK).json({ message: "Customer updated successfully!", data: customer })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update customer!", error: error.message });
        }
    }

    @Delete("/delete/:id/:userId/:companyId")
    async deleteCustomer(@Res() resp: Response, @Param("id") id: string, @Param("userId") userId: string, @Param("companyId") companyId: string) {
        try {
            await this.customerService.deleteCustomer(id, userId, companyId);
            resp.status(HttpStatus.OK).json({ message: "Customer deleted successfully!" })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete customer!", error: error.message });
        }
    }
}
