import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetProductionsFilter } from './GetProductionsFilter';
import { ProductionOutputDTO } from './DTO/production-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductionService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaProducions = this.prisma.production;

    async getAllProductions(filters: GetProductionsFilter): Promise<PaginatedOutputDto<ProductionOutputDTO>> {
        const where: Prisma.ProductionFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<ProductionOutputDTO, Prisma.ProductionFindManyArgs>(
            this.prismaProducions,
            {
                where,
                include: {
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

    async getProductionById(idProduction: string) {
        const productionExist = await this.prisma.production.findUnique({
            where: {
                id: idProduction
            }
        })

        if (!productionExist) throw new BadRequestException('Production not found!');

        return productionExist;

    }

}
