import { GetSalesOrderFilter } from './interfaces/GetSalesOrderFilter';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { CreateSalesOrderDTO } from './DTO/create-salesorder-dto';
import { UpdateSalesOrderDTO } from './DTO/update-salesorder-dto';
import { SalesOrderOutputDTO } from './DTO/sales-order-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalesOrder } from './entity/salesorder.entity';
import { createPaginator } from 'prisma-pagination';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SalesorderService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaSalesOrder = this.prisma.salesOrder;

    async getSalesOrder(filters: GetSalesOrderFilter): Promise<PaginatedOutputDto<SalesOrderOutputDTO>> {
        const where: Prisma.SalesOrderFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }
        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<SalesOrderOutputDTO, Prisma.SalesOrderFindManyArgs>(
            this.prismaSalesOrder,
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

    async getSalesOrderById(salesOrderId: string, companyId: string): Promise<SalesOrder> {

        const existCompany = await this.prisma.company.findUnique({
            where: { id: companyId },
            select: { id: true }
        })

        if (!existCompany) throw new Error('Company not found');

        const existSalesOrder = await this.prisma.salesOrder.findUnique({
            where: {
                id: salesOrderId,
                companyID: companyId
            }
        })

        if (!existSalesOrder) throw new Error('Sales Order not found');

        return existSalesOrder;
    }

    async createSalesOrder(salesOrder: CreateSalesOrderDTO): Promise<SalesOrder> {

        const existCompany = await this.prisma.company.findUnique({
            where: { id: salesOrder.companyID },
            select: { id: true }
        })

        if (!existCompany) throw new Error('Company not found');

        await this.permissionUser(salesOrder.userId, salesOrder.companyID, 'create');

        const { userId, ...salesOrderData } = salesOrder;

        const newSalesOrder = await this.prisma.salesOrder.create({
            data: {
                ...salesOrderData
            }
        });

        return newSalesOrder;
    }

    async updateSalesOrder(salesOrder: UpdateSalesOrderDTO, salesOrderId: string): Promise<SalesOrder> {

        const existCompany = await this.prisma.company.findUnique({
            where: { id: salesOrder.companyID },
            select: { id: true }
        })

        if (!existCompany) throw new Error('Company not found');

        const existSalesOrder = await this.prisma.salesOrder.findUnique({
            where: {
                id: salesOrderId,
                companyID: salesOrder.companyID
            }
        })

        if (!existSalesOrder) throw new Error('Sales Order not found');

        await this.permissionUser(salesOrder.userId, salesOrder.companyID, 'update');

        const { userId, ...salesOrderData } = salesOrder;

        const updateSalesOrder = await this.prisma.salesOrder.update({
            where: {
                id: salesOrderId
            },
            data: {
                ...salesOrderData
            }
        });

        return updateSalesOrder;
    }

    async deleteSalesOrder(salesOrderId: string, companyId: string, userId: string): Promise<SalesOrder> {

        const existSalesOrder = await this.prisma.salesOrder.findUnique({
            where: {
                id: salesOrderId,
                companyID: companyId
            }
        })

        if (!existSalesOrder) throw new Error('Sales Order not found');

        await this.permissionUser(userId, companyId, 'delete');

        const deleteSalesOrder = await this.prisma.salesOrder.delete({
            where: {
                id: salesOrderId
            }
        });

        return deleteSalesOrder;
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

}
