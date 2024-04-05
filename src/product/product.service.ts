import { Product } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllProducts() {
        const products = await this.prisma.product.findMany();
        return products;
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        return product;
    }

}
