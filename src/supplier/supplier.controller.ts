import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { GetSuppliersFilter } from './interfaces/GetSuppliersFilter';
import { CreateSupplier } from './DTO/create-supplier-dto';
import { SupplierOutputDTO } from './DTO/supplier-dto';
import { SupplierService } from './supplier.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Supplier')
@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }

    @ApiPaginatedResponse(SupplierOutputDTO)
    @Get()
    async getSuppliers(@Res() res: Response, @Query() filters: GetSuppliersFilter) {
        try {
            const suppliers = await this.supplierService.getSuppliers(filters);
            return res.status(HttpStatus.OK).json({ message: 'Suppliers fetched successfully!', data: suppliers });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching suppliers.', error: error.message });
        }
    }

    @Get('/:id')
    async getSupplierById(@Res() res: Response, @Param("id") id: string) {
        try {
            const supplier = await this.supplierService.getSupplierById(id);
            return res.status(HttpStatus.OK).json({ message: 'Supplier fetched successfully!', data: supplier });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while fetching supplier.', error: error.message });
        }
    }

    @Post("/create")
    async createSupplier(@Res() res: Response, @Body() createSupplierData: CreateSupplier) {
        try {
            const supplier = await this.supplierService.createSupplier(createSupplierData);
            return res.status(HttpStatus.OK).json({ message: 'Supplier created successfully!', data: supplier });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while creating supplier.', error: error.message });
        }
    }

    @Patch("/update/:id")
    async updateSupplier(@Res() res: Response, @Param("id") id: string, @Body() updateSupplierData: CreateSupplier) {
        try {
            const supplier = await this.supplierService.updateSupplier(id, updateSupplierData);
            return res.status(HttpStatus.OK).json({ message: 'Supplier updated successfully!', data: supplier });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'An error occurred while updating supplier.', error: error.message });
        }
    }

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
