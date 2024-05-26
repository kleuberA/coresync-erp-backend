import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { GetCRMFilter } from './GetCRMFilter';
import { CRMOutputDTO } from './DTO/crm-dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CrmService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaCRM = this.prisma.cRM;

    async getAllCRM(filters: GetCRMFilter): Promise<PaginatedOutputDto<CRMOutputDTO>> {
        const where: Prisma.CRMFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<CRMOutputDTO, Prisma.CRMFindManyArgs>(
            this.prismaCRM,
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

    async getCRMById(crmId: string) {

        const crm = await this.prisma.cRM.findUnique({
            where: {
                id: crmId
            }
        })

        if (!crm) throw new BadRequestException("CRM not found!");

        return crm;

    }

}
