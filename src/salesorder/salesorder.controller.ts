import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { GetSalesOrderFilter } from './interfaces/GetSalesOrderFilter';
import { CreateSalesOrderDTO } from './DTO/create-salesorder-dto';
import { SalesOrderOutputDTO } from './DTO/sales-order-dto';
import { SalesorderService } from './salesorder.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Sales Order")
@Controller('salesorder')
export class SalesorderController {
    constructor(private readonly salesorderService: SalesorderService) { }

    @ApiPaginatedResponse(SalesOrderOutputDTO)
    @Get()
    async getSalesOrder(@Res() res: Response, @Query() filters: GetSalesOrderFilter) {
        try {
            const salesOrder = await this.salesorderService.getSalesOrder(filters);
            return res.status(HttpStatus.OK).json({ message: 'Sales Order fetched successfully!', data: salesOrder });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch sales order!", error: error.message });
        }
    }

    @Get("/:id/:companyId")
    async getSalesOrderById(@Res() res: Response, @Param('id') id: string, @Param('companyId') companyId: string) {
        try {
            const salesOrder = await this.salesorderService.getSalesOrderById(id, companyId);
            return res.status(HttpStatus.OK).json({ message: 'Sales Order fetched successfully!', data: salesOrder });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch sales order!", error: error.message });
        }
    }

    @Post("/create")
    async createSalesOrder(@Res() res: Response, @Body() salesOrderData: CreateSalesOrderDTO) {
        try {
            const salesOrder = await this.salesorderService.createSalesOrder(salesOrderData);
            return res.status(HttpStatus.OK).json({ message: 'Sales Order created successfully!', data: salesOrder });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create sales order!", error: error.message });
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
