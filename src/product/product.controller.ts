import { ProductService } from './product.service';
import { Controller, Get, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getAllProducts(@Res() res: Response) {
        try {
            const products = await this.productService.getAllProducts();
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
