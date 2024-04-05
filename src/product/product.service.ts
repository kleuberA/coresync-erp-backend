import { Prisma, Product } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProductFilter } from './GetProductFilter';
import { createPaginator } from 'prisma-pagination';
import { ProductOutputDTO } from './DTO/product-dto';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismProducts = this.prisma.product;

    async getAllProducts(filters: GetProductFilter): Promise<PaginatedOutputDto<ProductOutputDTO>> {
        const where: Prisma.ProductFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }

        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<ProductOutputDTO, Prisma.ProductFindManyArgs>(
            this.prismProducts,
            {
                where,
                orderBy: {
                    id: 'desc',
                },
            },
            {
                page: filters.page ?? 1,
            },
        );
    }

    async getProductById(id: string): Promise<Product> {

        const product = await this.prisma.product.findUnique({
            where: { id }
        });

        if (!product) throw new Error('Product not found.');

        return product;
    }

}
