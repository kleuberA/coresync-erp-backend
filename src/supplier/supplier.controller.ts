import { Controller, Get, HttpStatus, Query, Req, Res } from '@nestjs/common';
import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { SupplierService } from './supplier.service';
import { Response, Request } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { SupplierOutputDTO } from './DTO/supplier-dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }

    @IsPublic()
    @ApiPaginatedResponse(SupplierOutputDTO)
    @Get()
    async getSuppliers(@Res() res: Response, @Req() req: Request, @Query() filters: GetSuppliersFilter) {
        try {
            const suppliers = await this.supplierService.getSuppliers(filters);
            return res.status(HttpStatus.OK).json({ message: 'Suppliers fetched successfully!', data: suppliers });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching suppliers.', error: error.message });
        }
    }

}
