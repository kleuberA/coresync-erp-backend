import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { Prisma } from '@prisma/client';
import { createPaginator } from 'prisma-pagination';
import { SupplierOutputDTO } from './DTO/supplier-dto';

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

}
