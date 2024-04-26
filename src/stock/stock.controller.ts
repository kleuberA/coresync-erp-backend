import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { GetStockFilter } from './interfaces/GetStockFilter';
import { StockOutputDTO } from './DTO/stock-dto';
import { StockService } from './stock.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Stock")
@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) { }

    @ApiPaginatedResponse(StockOutputDTO)
    @Get()
    async getStocks(@Res() res: Response, @Query() filters: GetStockFilter) {
        try {
            const stock = await this.stockService.getStocks(filters);
            return res.status(HttpStatus.OK).json({ message: 'Stock fetched successfully!', data: stock });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching stock.', error: error.message });
        }
    }

    @Get('/:id')
    async getStockById(@Res() res: Response, @Param('id') id: string) {
        try {
            const stock = await this.stockService.getStockById(id);
            return res.status(HttpStatus.OK).json({ message: 'Stock fetched successfully!', data: stock });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching stock.', error: error.message });
        }
    }

}
