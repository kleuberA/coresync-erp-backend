import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from './entity/customer.entity';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllCustomers(): Promise<Customer[]> {
        const customers = await this.prisma.customer.findMany();
        return customers;
    }

    async getCustomerById(id: string): Promise<Customer> {
        const customer = await this.prisma.customer.findUnique({
            where: { id }
        });
        return customer;
    }

}
