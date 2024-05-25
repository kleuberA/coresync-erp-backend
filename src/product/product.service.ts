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
            where: { id },
            include: {
                commentsOrNotes: true
            }
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

        const { userId, supplierId, ...newProductData } = productData;

        return await this.prisma.product.create({
            data: {
                ...newProductData,
                supplier: {
                    connect: { id: productData.supplierId }
                },
                commentsOrNotes: {
                    connect: productData.commentsOrNotes.map(comment => ({ id: comment }))
                },
                production: {
                    connect: productData.production.map(production => ({ id: production }))
                },
                salesHistory: {
                    connect: productData.salesHistory.map(sale => ({ id: sale }))
                },
                categories: {
                    connect: productData.categories.map(category => ({ id: category }))
                },
                stock: {
                    connect: productData.stock.map(stock => ({ id: stock }))
                }
            }
        });
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

        const { userId, supplierId, ...newProductData } = updateProductData;

        return await this.prisma.product.update({
            where: { id: productId },
            data: {
                ...newProductData,
                supplier: {
                    connect: { id: product.supplierId }
                },
                stock: {
                    connect: updateProductData.stock.map(stock => ({ id: stock }))
                }
            }
        })
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
