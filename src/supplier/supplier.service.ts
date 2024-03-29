import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierOutputDTO } from './DTO/supplier-dto';
import { createPaginator } from 'prisma-pagination';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Supplier } from './entity/supplier.entity';

@Injectable()
export class SupplierService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaSuppliers = this.prisma.supplier;

    async getSuppliers(filters: GetSuppliersFilter): Promise<PaginatedOutputDto<SupplierOutputDTO>> {

        const where: Prisma.ProjectFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }
        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<SupplierOutputDTO, Prisma.ProjectFindManyArgs>(
            this.prismaSuppliers,
            {
                where,
                orderBy: {
                    id: 'desc',
                },
            },
            {
                page: filters.page ?? 1,
            },
        );
    }

    async getSupplierById(supplierId: string): Promise<SupplierOutputDTO> {

        const supplierExist = await this.supplierExist(supplierId);

        return supplierExist;
    }

    async deleteSupplier(supplierId: string, userId: string): Promise<Supplier> {

        const supplier = await this.supplierExist(supplierId);

        await this.permissionUser(userId, supplier.companyId, 'delete');

        return await this.prismaSuppliers.delete({
            where: {
                id: supplierId,
            },
        });

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

    async supplierExist(supplierId: string): Promise<Supplier> {
        const supplierExist = await this.prismaSuppliers.findUnique({
            where: {
                id: supplierId,
            },
        });

        if (!supplierExist) throw new Error('Supplier not found.');

        return supplierExist;
    }

}
