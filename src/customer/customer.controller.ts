import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
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

}
