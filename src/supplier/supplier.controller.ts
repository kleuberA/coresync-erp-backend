import { Controller, Delete, Get, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { SupplierOutputDTO } from './DTO/supplier-dto';
import { SupplierService } from './supplier.service';
import { Response, Request } from 'express';
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

    @IsPublic()
    @Get('/:id')
    async getSupplierById(@Res() res: Response, @Param("id") id: string) {
        try {
            const supplier = await this.supplierService.getSupplierById(id);
            return res.status(HttpStatus.OK).json({ message: 'Supplier fetched successfully!', data: supplier });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching supplier.', error: error.message });
        }
    }

    @IsPublic()
    @Delete("/delete/:id")
    async deleteSupplier(@Res() res: Response, @Param("id") id: string, @Param("userId") userId: string) {
        try {
            const supplier = await this.supplierService.deleteSupplier(id, userId);
            return res.status(HttpStatus.OK).json({ message: 'Supplier deleted successfully!', data: supplier });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while deleting supplier.', error: error.message });
        }
    }

}
