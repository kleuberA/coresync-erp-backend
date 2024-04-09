import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SalesOrder } from './entity/salesorder.entity';

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

}
