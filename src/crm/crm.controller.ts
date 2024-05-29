import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { CreateCRMDTO } from './DTO/create-crm-dto';
import { GetCRMFilter } from './GetCRMFilter';
import { CRMOutputDTO } from './DTO/crm-dto';
import { CrmService } from './crm.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("CRM")
@Controller('crm')
export class CrmController {
    constructor(private readonly crmService: CrmService) { }

    @ApiPaginatedResponse(CRMOutputDTO)
    @Get()
    async getAllCRM(@Res() res: Response, @Query() filters: GetCRMFilter) {
        try {
            const crm = await this.crmService.getAllCRM(filters);
            return res.status(HttpStatus.OK).json({ message: 'CRM fetched successfully!', data: crm })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch CRM!', error: error.message })
        }
    }

    @Get("/:id")
    async getCRMById(@Res() res: Response, @Query('id') crmId: string) {
        try {
            const crm = await this.crmService.getCRMById(crmId);
            return res.status(HttpStatus.OK).json({ message: 'CRM fetched successfully!', data: crm })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch CRM!', error: error.message })
        }
    }

    @Post("/create")
    async createCRM(@Res() res: Response, @Body() data: CreateCRMDTO) {
        try {
            const crm = await this.crmService.createCRM(data);
            return res.status(HttpStatus.OK).json({ message: 'CRM created successfully!', data: crm })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to create CRM!', error: error.message })
        }
    }

    @Put("/update/:id")
    async updateCRM(@Res() res: Response, @Query('id') crmId: string, @Body() data: CreateCRMDTO) {
        try {
            const crm = await this.crmService.updateCRM(crmId, data);
            return res.status(HttpStatus.OK).json({ message: 'CRM updated successfully!', data: crm })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to update CRM!', error: error.message })
        }
    }

    @Delete("/delete/:id")
    async deleteCRM(@Res() res: Response, @Param('id') crmId: string) {
        try {
            await this.crmService.deleteCRM(crmId);
            return res.status(HttpStatus.OK).json({ message: 'CRM deleted successfully!' })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to delete CRM!', error: error.message })
        }
    }

}
