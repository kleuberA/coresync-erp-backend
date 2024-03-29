import { UpdateCustomerDTO } from './DTO/update-customer-dto';
import { CreateCustomerDto } from './DTO/create-customer-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from './entity/customer.entity';
import { Injectable } from '@nestjs/common';

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

    async createCustomer(createCustomer: CreateCustomerDto): Promise<Customer> {

        const existCompany = await this.prisma.company.findUnique({
            where: {
                id: createCustomer.companyId
            }
        })

        if (!existCompany) throw new Error("Company not found!");

        await this.permissionUser(createCustomer.userId, createCustomer.companyId, 'create');

        let validate: boolean;

        if (createCustomer.type === 'Juridica') {
            validate = this.validateCNPJ(createCustomer.fiscalCode);
            if (!validate) throw new Error("Invalid CNPJ!");
        }

        if (createCustomer.type === 'Fisica') {
            validate = this.validateCPF(createCustomer.fiscalCode);
            if (!validate) throw new Error("Invalid CPF!");
        }

        const { userId, ...createCustomerData } = createCustomer;

        const customer = await this.prisma.customer.create({
            data: {
                ...createCustomerData
            }
        });
        return customer;
    }

    async updateCustomer(costumerId: string, updateCustomerData: UpdateCustomerDTO): Promise<Customer> {
        const customer = await this.getCustomerById(costumerId);

        if (!customer) throw new Error("Customer not found!");

        await this.permissionUser(updateCustomerData.userId, customer.companyId, 'update');

        const { userId, ...updateCustomerDataFormat } = updateCustomerData;

        const updateCustomer = await this.prisma.customer.update({
            where: {
                id: costumerId
            },
            data: {
                ...updateCustomerDataFormat
            }
        });

        return updateCustomer;
    }

    async deleteCustomer(costumerId: string, userId: string, companyId: string): Promise<Customer> {

        const existCustomer = await this.prisma.customer.findUnique({
            where: {
                id: costumerId
            }
        });

        if (!existCustomer) throw new Error("Customer not found!");

        await this.permissionUser(userId, companyId, 'delete');

        const customer = await this.prisma.customer.delete({
            where: {
                id: costumerId
            }
        });
        return customer;
    }

    async permissionUser(userId: string, companyId: string, method: string) {
        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: userId,
                companyId: companyId
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company',
                    }
                }
            }
        });

        if (!userPermission) throw new Error(`User not authorized to ${method} task.`);
    }

    validateCNPJ(cnpj: string): boolean {
        cnpj = cnpj.replace(/\D/g, '');
        if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
            return false;
        }

        let sum = 0;
        let weight = 5;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj.charAt(i)) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }

        let checkDigit1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (parseInt(cnpj.charAt(12)) !== checkDigit1) {
            return false;
        }

        sum = 0;
        weight = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj.charAt(i)) * weight;
            weight = weight === 2 ? 9 : weight - 1;
        }
        let checkDigit2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);

        if (parseInt(cnpj.charAt(13)) !== checkDigit2) {
            return false;
        }

        return true;
    }

    validateCPF(cpf: string): boolean {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
            return false;
        }

        if (/^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let rest = sum % 11;
        let checkDigit1 = rest < 2 ? 0 : 11 - rest;

        if (parseInt(cpf.charAt(9)) !== checkDigit1) {
            return false;
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        rest = sum % 11;
        let checkDigit2 = rest < 2 ? 0 : 11 - rest;

        if (parseInt(cpf.charAt(10)) !== checkDigit2) {
            return false;
        }

        return true;
    }

}
