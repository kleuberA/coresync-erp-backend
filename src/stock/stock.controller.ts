import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { GetStockFilter } from './interfaces/GetStockFilter';
import { CreateStockDTO } from './DTO/create-stock-dto';
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

    @Post("/create")
    async createStock(@Res() res: Response, @Body() data: CreateStockDTO) {
        try {
            const stock = await this.stockService.createStock(data);
            return res.status(HttpStatus.OK).json({ message: 'Stock created successfully!', data: stock });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while creating stock.', error: error.message });
        }
    }

}
