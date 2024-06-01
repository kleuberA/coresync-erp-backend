import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { GetLogisticsFilter } from './GetLogisticsFilter';
import { LogisticsOutpuDTO } from './DTO/logistics-dto';
import { LogisticsService } from './logistics.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Logistics")
@Controller('logistics')
export class LogisticsController {
    constructor(private readonly logisticsService: LogisticsService) { }

    @ApiPaginatedResponse(LogisticsOutpuDTO)
    @Get()
    async getAllLogistics(@Res() res: Response, @Query() filters: GetLogisticsFilter) {
        try {
            const logistics = await this.logisticsService.getLogistics(filters);
            return res.status(HttpStatus.OK).json({ message: 'Logistics fetched successfully!', data: logistics })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch logistics!', error: error.message })
        }
    }

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
