import { Response } from 'express';
import { ProductionService } from './production.service';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';

@Controller('production')
export class ProductionController {
    constructor(private readonly productionService: ProductionService) { }

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
