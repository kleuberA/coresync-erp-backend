import { LogisticsService } from './logistics.service';
import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Logistics")
@Controller('logistics')
export class LogisticsController {
    constructor(private readonly logisticsService: LogisticsService) { }

    @Get("/:id")
    async getLogisticsById(@Res() res: Response, @Param('id') idLogistics: string) {
        try {
            const logistic = await this.logisticsService.getLogisticsById(idLogistics);
            return res.status(HttpStatus.OK).json({ message: 'Logistic fetched successfully!', data: logistic })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch Logistic!', error: error.message })
        }
    }

}
