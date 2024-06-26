import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { GetLogisticsFilter } from './GetLogisticsFilter';
import { LogisticsOutpuDTO } from './DTO/logistics-dto';
import { LogisticsService } from './logistics.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateLogisticsDTO } from './DTO/create-logistics-dto';
import { UpdateLogisticDTO } from './DTO/update-logistic-dto';

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

    @Post("/create")
    async createLogistics(@Res() res: Response, @Body() dataLogistic: CreateLogisticsDTO) {
        try {
            await this.logisticsService.createLogistics(dataLogistic);
            return res.status(HttpStatus.CREATED).json({ message: 'Logistic created successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to create Logistic!', error: error.message })
        }
    }

    @Put("/update/:id")
    async updateLogistics(@Res() res: Response, @Param('id') idLogistics: string, @Body() dataLogistic: UpdateLogisticDTO) {
        try {
            await this.logisticsService.updateLogistic(idLogistics, dataLogistic);
            return res.status(HttpStatus.OK).json({ message: 'Logistic updated successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to update Logistic!', error: error.message })
        }
    }

    @Delete("/delete/:id")
    async deleteLogistics(@Res() res: Response, @Param('id') idLogistics: string) {
        try {
            await this.logisticsService.deleteLogistics(idLogistics);
            return res.status(HttpStatus.OK).json({ message: 'Logistic deleted successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to delete Logistic!', error: error.message })
        }
    }

}
