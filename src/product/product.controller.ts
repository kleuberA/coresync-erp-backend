import { ProductService } from './product.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/ApiPaginatedResponse';
import { ProjectOutputDto } from 'src/project/DTO/project-dto';
import { GetProductFilter } from './GetProductFilter';
import { CreateProduct } from './DTO/create-product-dto';
import { UpdateProductDTO } from './DTO/update-product-dto';

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

    @IsPublic()
    @Post("/create")
    async createProduct(@Res() res: Response, @Body() productData: CreateProduct) {
        try {
            const product = await this.productService.createProduct(productData);
            return res.status(HttpStatus.OK).json({ message: 'Product created successfully!', data: product })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to create product!', error: error.message })
        }
    }

    @Patch('/update/:id')
    async updateProduct(@Param('id') id: string, @Body() productData: UpdateProductDTO, @Res() res: Response) {
        try {
            const product = await this.productService.updateProduct(id, productData);
            return res.status(HttpStatus.OK).json({ message: 'Product updated successfully!', data: product })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to update product!', error: error.message })
        }
    }

    @Delete('/delete/:id/:userId')
    async deleteProduct(@Param('id') id: string, @Param('userId') userId: string, @Res() res: Response) {
        try {
            const product = await this.productService.deleteProduct(id, userId);
            return res.status(HttpStatus.OK).json({ message: 'Product deleted successfully!', data: product })
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Failed to delete product!', error: error.message })
        }
    }

}
