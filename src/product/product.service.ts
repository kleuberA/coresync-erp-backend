import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllProducts() {
        const products = await this.prisma.product.findMany();
        return products;
    }

}
