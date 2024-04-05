import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { UpdateSupplier } from './DTO/update-supplier-dto';
import { CreateSupplier } from './DTO/create-supplier-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupplierOutputDTO } from './DTO/supplier-dto';
import { Supplier } from './entity/supplier.entity';
import { createPaginator } from 'prisma-pagination';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SupplierService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaSuppliers = this.prisma.supplier;

    async getSuppliers(filters: GetSuppliersFilter): Promise<PaginatedOutputDto<SupplierOutputDTO>> {

        const where: Prisma.SupplierFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }
        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<SupplierOutputDTO, Prisma.SupplierFindManyArgs>(
            this.prismaSuppliers,
            {
                where,
                include: {
                    products: true
                },
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

    async createSupplier(data: CreateSupplier): Promise<Supplier> {

        const companyExist = await this.prisma.company.findUnique({
            where: {
                id: data.companyId,
            },
        });

        if (!companyExist) throw new Error('Company not found.');

        await this.permissionUser(data.userId, data.companyId, 'create');

        const { userId, ...createSupplierData } = data;

        const supplier = await this.prismaSuppliers.create({
            data: {
                ...createSupplierData
            },
        });

        return supplier;

    }

    async updateSupplier(supplierId: string, data: UpdateSupplier): Promise<Supplier> {

        const supplier = await this.supplierExist(supplierId);

        await this.permissionUser(data.userId, supplier.companyId, 'update');

        const { userId, ...updateSupplierData } = data;

        return await this.prismaSuppliers.update({
            where: {
                id: supplierId,
            },
            data: {
                ...updateSupplierData
            },
        });

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
