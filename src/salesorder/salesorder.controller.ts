import { ApiTags } from '@nestjs/swagger';
import { SalesorderService } from './salesorder.service';
import { Controller, Delete, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@ApiTags("Sales Order")
@Controller('salesorder')
export class SalesorderController {
    constructor(private readonly salesorderService: SalesorderService) { }

    @Get("/:id/:companyId")
    async getSalesOrderById(@Res() res: Response, @Param('id') id: string, @Param('companyId') companyId: string) {
        try {
            const salesOrder = await this.salesorderService.getSalesOrderById(id, companyId);
            return res.status(HttpStatus.OK).json({ message: 'Sales Order fetched successfully!', data: salesOrder });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch sales order!", error: error.message });
        }
    }

    @Delete("/delete/:id/:companyId/:userId")
    async deleteSalesOrder(@Res() res: Response, @Param('id') salesOrderId: string, @Param('companyId') companyId: string, @Param('userId') userId: string) {
        try {
            const salesOrder = await this.salesorderService.deleteSalesOrder(salesOrderId, companyId, userId);
            return res.status(HttpStatus.OK).json({ message: 'Sales Order deleted successfully!', data: salesOrder });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete sales order!", error: error.message });
        }
    }

}