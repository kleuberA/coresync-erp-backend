import { ProductService } from './product.service';
import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
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

}
