import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Response } from 'express';

@ApiTags("Customer")
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async getAllCustomers(@Res() resp: Response) {
        try {
            const customers = this.customerService.getAllCustomers();
            resp.status(HttpStatus.OK).json({ message: "Customers fetched successfully!", data: customers })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch customers!", error: error.message });
        }
    }

    @Get('/:id')
    async getCustomerById(@Res() resp: Response, @Param("id") id: string) {
        try {
            const customer = this.customerService.getCustomerById(id);
            resp.status(HttpStatus.OK).json({ message: "Customer fetched successfully!", data: customer })
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch customer!", error: error.message });
        }
    }

}
