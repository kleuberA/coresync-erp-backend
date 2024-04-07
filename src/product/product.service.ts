import { Prisma, Product } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GetProductFilter } from './GetProductFilter';
import { createPaginator } from 'prisma-pagination';
import { ProductOutputDTO } from './DTO/product-dto';
import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { CreateProduct } from './DTO/create-product-dto';
import { UpdateProductDTO } from './DTO/update-product-dto';

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
                include: {
                    categories: true,
                    salesHistory: true,
                    commentsOrNotes: true,
                },
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

    async createProduct(productData: CreateProduct): Promise<Product> {

        const supplierExist = await this.prisma.supplier.findUnique({
            where: { id: productData.supplierId }
        });

        if (!supplierExist) throw new Error('Supplier not found.');

        await this.permissionUser(productData.userId, supplierExist.companyId, 'create');

        const { userId, ...newProductData } = productData;

        const product = await this.prisma.product.create({
            data: {
                ...newProductData
            }
        });

        return product;

    }

    async updateProduct(productId: string, updateProductData: UpdateProductDTO) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) throw new Error('Product not found.');

        const supplier = await this.prisma.supplier.findUnique({
            where: { id: product.supplierId }
        });

        await this.permissionUser(updateProductData.userId, supplier.companyId, 'update');

        const { userId, ...newProductData } = updateProductData;

        return await this.prisma.product.update({
            where: { id: productId },
            data: {
                ...newProductData
            }
        });
    }

    async deleteProduct(productId: string, userId: string) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) throw new Error('Product not found.');

        const supplier = await this.prisma.supplier.findUnique({
            where: { id: product.supplierId }
        });

        await this.permissionUser(userId, supplier.companyId, 'delete');

        return await this.prisma.product.delete({
            where: { id: productId }
        });
    }

    async permissionUser(userId: string, companyId: string, method: string) {
        const userPermission = await this.prisma.user.findFirst({
            where: {
                id: userId,
                companyId: companyId
            },
            select: {
                roles: {
                    where: {
                        name: 'admin_company',
                    }
                }
            }
        });

        if (!userPermission) throw new Error(`User not authorized to ${method} product.`);
    }

}
