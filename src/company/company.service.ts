import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompany } from './DTO/create-company-dto';
import { UpdateCompany } from './DTO/update-company-dto';
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
                roles: true,
                users: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                },
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
                users: {
                    connect: {
                        id: createCompany.idUser,
                    }
                },
            }
        });

        const role = await this.prisma.role.create({
            data: {
                name: "admin_company",
                companyId: createdCompany.id
            }
        })

        await this.prisma.user.update({
            where: {
                id: createCompany.idUser,
            },
            data: {
                roles: {
                    connect: {
                        id: role.id,
                    },
                }
            }
        })

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
                users: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                },
                roles: true
            }
        });

        return updatedCompany;
    }

    async updateCompany(idCompany: string, updateCompany: UpdateCompany) {
        const companyExist = await this.prisma.company.findUnique({
            where: {
                id: idCompany,
            },
            include: {
                address: true
            }
        });

        if (!companyExist) throw new Error("Company does not exist!");

        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: updateCompany.idUser,
                companyId: idCompany
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company'
                    }
                }
            }
        });

        if (!userPermission) throw new Error("User does not have permission to update the company!");

        const address = updateCompany.address;

        if (address) {
            await this.prisma.address.update({
                where: {
                    id: companyExist.address.id,
                },
                data: {
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    zip: address.zip,
                }
            });
        }

        const updatedCompany = await this.prisma.company.update({
            where: {
                id: idCompany,
            },
            data: {
                name: updateCompany.name,
                phone: updateCompany.phone,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                users: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                },
                roles: true
            }
        });

        return updatedCompany;

    }

    async deleteCompany(companyId: string) {

        const companyExist = await this.prisma.company.findUnique({
            where: {
                id: companyId,
            },
            include: {
                users: true,
                roles: true,
                address: true
            },
        });

        if (!companyExist) {
            throw new Error("Company does not exist!");
        }

        await this.prisma.user.deleteMany({
            where: {
                companyId: companyId,
            },
        });

        await this.prisma.role.deleteMany({
            where: {
                companyId: companyId,
            },
        });

        if (companyExist.address && companyExist.address.id) {
            await this.prisma.address.delete({
                where: {
                    id: companyExist.address.id,
                },
            });
        }

        return await this.prisma.company.delete({
            where: {
                id: companyId,
            },
        });
    }
}
