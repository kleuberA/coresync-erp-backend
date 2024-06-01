import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { GetLogisticsFilter } from './GetLogisticsFilter';
import { LogisticsOutpuDTO } from './DTO/logistics-dto';
import { createPaginator } from 'prisma-pagination';
import { Logistics, Prisma } from '@prisma/client';

@Injectable()
export class LogisticsService {

    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaLogistics = this.prisma.logistics;

    async getLogistics(filters: GetLogisticsFilter): Promise<PaginatedOutputDto<LogisticsOutpuDTO>> {

        const where: Prisma.LogisticsFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<LogisticsOutpuDTO, Prisma.LogisticsFindManyArgs>(
            this.prismaLogistics,
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

    async getLogisticsById(idLogistic: string): Promise<Logistics> {

        const existLogist = await this.prisma.logistics.findUnique({
            where: {
                id: idLogistic
            }
        })

        if (!existLogist) throw new BadRequestException("Logistic not found!");

        return existLogist;

    }

}
