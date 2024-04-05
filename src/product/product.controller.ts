import { ProductService } from './product.service';
import { Controller, Get, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { ProjectOutputDto } from 'src/project/DTO/project-dto';
import { GetProductFilter } from './GetProductFilter';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @IsPublic()
    @ApiPaginatedResponse(ProjectOutputDto)
    @Get()
    async getAllProducts(@Res() res: Response, @Query() filters: GetProductFilter) {
        try {
            const products = await this.productService.getAllProducts(filters);
            return res.status(HttpStatus.OK).json({ message: 'Products fetched successfully!', data: products })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch products!', error: error.message })
        }
    }

    @Get('/:id')
    async getProductById(@Param('id') id: string, @Res() res: Response) {
        try {
            const product = await this.productService.getProductById(id);
            return res.status(HttpStatus.OK).json({ message: 'Product fetched successfully!', data: product })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to fetch product!', error: error.message })
        }
    }

}
