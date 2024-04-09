import { PrismaService } from 'src/prisma/prisma.service';
import { SalesOrder } from './entity/salesorder.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesorderService {
    constructor(private readonly prisma: PrismaService) { }

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
