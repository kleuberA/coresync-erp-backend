import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { CreateCompany } from './DTO/create-company-dto';
import { UpdateCompany } from './DTO/update-company-dto';
import { CompanyService } from './company.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }
    @IsPublic()
    @Get()
    async getCompanies(@Res() resp: Response) {
        try {
            const companies = await this.companyService.getCompanies();
            return resp.status(HttpStatus.OK).json({ message: "Companies fetched successfully!", data: companies });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to fetch companies!", error: error.message });
        }
    }

    @ApiBody({ type: CreateCompany })
    @Post("create")
    async createCompany(@Body() createCompany: CreateCompany, @Res() resp: Response) {
        try {
            const company = await this.companyService.createCompany(createCompany);
            return resp.status(HttpStatus.CREATED).json({ message: "Company created successfully!", data: company });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to create company!", error: error.message });
        }
    }

    @Delete("delete/:id")
    async deleteCompany(@Param() params, @Res() resp: Response) {
        try {
            await this.companyService.deleteCompany(params.id);
            return resp.status(HttpStatus.OK).json({ message: "Company deleted successfully!" });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to delete company!", error: error.message });
        }
    }

    @ApiBody({ type: UpdateCompany })
    @Patch("update/:id")
    async updateCompany(@Param() params, @Body() updateCompany: UpdateCompany, @Res() resp: Response) {
        try {
            const company = await this.companyService.updateCompany(params.id, updateCompany);
            return resp.status(HttpStatus.OK).json({ message: "Company updated successfully!", data: company });
        } catch (error) {
            return resp.status(HttpStatus.BAD_REQUEST).json({ message: "Failed to update company!", error: error.message });
        }
    }
}
