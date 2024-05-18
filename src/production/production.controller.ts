import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { GetProductionsFilter } from './GetProductionsFilter';
import { ProductionOutputDTO } from './DTO/production-dto';
import { ProductionService } from './production.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Production")
@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

    @ApiPaginatedResponse(ProductionOutputDTO)
    @Get()
    async getAllProductions(@Res() res: Response, @Query() filters: GetProductionsFilter) {
        try {
            const productions = await this.productionService.getAllProductions(filters);
            return res.status(HttpStatus.OK).json({ message: 'Productions fetched successfully!', data: productions })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch productions!', error: error.message })
        }
    }

    @Get("/:id")
    async getProductionById(@Res() res: Response, @Param("id") id: string) {
        try {
            const production = await this.productionService.getProductionById(id);
            return res.status(HttpStatus.OK).json({ message: 'Production fetched successfully!', data: production })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch production!', error: error.message })
        }
    }

}
