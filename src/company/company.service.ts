import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompany } from './DTO/create-company-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyService {
    constructor(private readonly prisma: PrismaService) { }

    async getCompanies() {
        const companies = await this.prisma.company.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                users: true,
            }
        });
        return companies;
    }

    async createCompany(createCompany: CreateCompany) {
        const companyExist = await this.prisma.company.findFirst({
            where: {
                name: createCompany.name
            }
        });

        if (companyExist) {
            throw new Error("Company already exists!");
        }

        const address = createCompany.address;

        const createdCompany = await this.prisma.company.create({
            data: {
                name: createCompany.name,
                phone: createCompany.phone,
                users: { create: [] }
            }
        });

        const createdAddress = await this.prisma.address.create({
            data: {
                street: address.street,
                city: address.city,
                state: address.state,
                zip: address.zip,
                companyId: createdCompany.id,
            }
        });

        const updatedCompany = await this.prisma.company.update({
            where: {
                id: createdCompany.id,
            },
            data: {
                address: {
                    connect: {
                        id: createdAddress.id,
                    }
                }
            },
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                users: true,
            }
        });

        return updatedCompany;
    }
}
