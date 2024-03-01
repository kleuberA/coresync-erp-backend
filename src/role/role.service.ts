import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRole } from './DTO/create-role-dto';
import { UpdateRole } from './DTO/update-role-dto';

@Injectable()
export class RoleService {
    constructor(private readonly prisma: PrismaService) { }

    async getRolesCompany(companyId: string) {
        return await this.prisma.role.findMany({
            where: {
                companyId: companyId
            },
        });
    }

    async createRole(createRole: CreateRole) {

        const companyExist = await this.prisma.company.findUnique({
            where: {
                id: createRole.companyId
            }
        })

        if (!companyExist) throw new Error("Company does not exist!");

        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: createRole.userId,
                companyId: createRole.companyId
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company'
                    }
                }
            }
        });

        if (!userPermission) throw new Error("You do not have permission to create a role!");

        return await this.prisma.role.create({
            data: {
                name: createRole.name,
                Company: {
                    connect: {
                        id: createRole.companyId
                    }
                }
            }
        });
    }

    async updateRole(roleId: string, updateRole: UpdateRole) {
        const roleExist = await this.prisma.role.findUnique({
            where: {
                id: roleId
            }
        });

        if (!roleExist) throw new Error("Role does not exist!");

        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: updateRole.userId,
                companyId: updateRole.companyId
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company'
                    }
                }
            }
        });

        if (!userPermission) throw new Error("You do not have permission to create a role!");

        return await this.prisma.role.update({
            where: {
                id: roleId
            },
            data: {
                name: updateRole.name
            }
        });
    }

    async deleteRole(roleId: string) {
        const roleExist = await this.prisma.role.findUnique({
            where: {
                id: roleId
            }
        });

        if (!roleExist) throw new Error("Role does not exist!");

        return await this.prisma.role.delete({
            where: {
                id: roleId
            }
        });
    }
}
