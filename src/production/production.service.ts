import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { UpdateProductionDTO } from './DTO/update-production-dto';
import { CreateProductionDTO } from './DTO/create-production-dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GetProductionsFilter } from './GetProductionsFilter';
import { ProductionOutputDTO } from './DTO/production-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductionService {
    constructor(private readonly prisma: PrismaService, private readonly notificationsGateway: NotificationsGateway) { }

    private readonly prismaProductions = this.prisma.production;

    async getAllProductions(filters: GetProductionsFilter): Promise<PaginatedOutputDto<ProductionOutputDTO>> {
        const where: Prisma.ProductionFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<ProductionOutputDTO, Prisma.ProductionFindManyArgs>(
            this.prismaProductions,
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

    async createProduction(dataProduction: CreateProductionDTO): Promise<ProductionOutputDTO> {

        const productExist = await this.prisma.product.findUnique({
            where: {
                id: dataProduction.productId
            }
        })

        if (!productExist) throw new BadRequestException('Product not found!');

        const production = await this.prismaProductions.create({
            data: {
                ...dataProduction
            }
        });

        return production;

    }

    async UpdateProduction(idProduction: string, dataUpdateProduction: UpdateProductionDTO): Promise<ProductionOutputDTO> {
        const productionExist = await this.prismaProductions.findUnique({
            where: {
                id: idProduction
            }
        });

        if (!productionExist) throw new BadRequestException('Production not found!');

        const supplier = await this.prisma.supplier.findUnique({
            where: {
                id: dataUpdateProduction.supplierId
            }
        })

        if (!supplier) throw new BadRequestException('Supplier not found!');

        await this.permissionUser(dataUpdateProduction.userId, supplier.companyId, 'update');

        const { userId, supplierId, ...newDataUpdateProduction } = dataUpdateProduction;

        const production = await this.prismaProductions.update({
            where: {
                id: idProduction
            },
            data: {
                ...newDataUpdateProduction
            }
        });

        return production;
    }

    async deleteProduction(idProduction: string, userId: string, companyId: string): Promise<ProductionOutputDTO> {

        const productionExist = await this.prisma.production.findUnique({
            where: {
                id: idProduction
            }
        })

        if (!productionExist) throw new BadRequestException('Production not found!');

        await this.permissionUser(userId, companyId, "delete");

        return await this.prismaProductions.delete({
            where: {
                id: idProduction
            }
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

        if (!userPermission) throw new Error(`User not authorized to ${method} product.`);
    }

}
