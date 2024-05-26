import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
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

}
