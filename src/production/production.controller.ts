import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { CreateProductionDTO } from './DTO/create-production-dto';
import { UpdateProductionDTO } from './DTO/update-production-dto';
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

    @Post("/create")
    async createProduction(@Res() res: Response, @Body() data: CreateProductionDTO) {
        try {
            const production = await this.productionService.createProduction(data);
            return res.status(HttpStatus.OK).json({ message: 'Production created successfully!', data: production })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to create production!', error: error.message })
        }
    }

    @Patch("/update/:id")
    async updateProduction(@Res() res: Response, @Param("id") id: string, @Body() data: UpdateProductionDTO) {
        try {
            const production = await this.productionService.UpdateProduction(id, data);
            return res.status(HttpStatus.OK).json({ message: 'Production updated successfully!', data: production })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to update production!', error: error.message })
        }
    }

    @Delete("/delete/:id/:userId/:companyId")
    async deleteProduction(@Res() res: Response, @Param("id") id: string, @Param("userId") userId: string, @Param("companyId") companyId: string) {
        try {
            await this.productionService.deleteProduction(id, userId, companyId);
            return res.status(HttpStatus.OK).json({ message: 'Production deleted successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to delete production!', error: error.message })
        }
    }
}
