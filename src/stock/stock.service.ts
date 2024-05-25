import { PaginatedOutputDto } from 'src/common/PaginatedOutputDto';
import { GetStockFilter } from './interfaces/GetStockFilter';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { StockOutputDTO } from './DTO/stock-dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateStockDTO } from './DTO/create-stock-dto';
import { UpdateStockDTO } from './DTO/update-stock-dto';

@Injectable()
export class StockService {
    constructor(private readonly prisma: PrismaService) { }

    private readonly prismaStock = this.prisma.stock;

    async getStocks(filters: GetStockFilter): Promise<PaginatedOutputDto<StockOutputDTO>> {
        const where: Prisma.StockFindManyArgs['where'] = {};

        for (const key in filters) {
            if (key != 'page' && key != 'pageSize') {
                where[key] = filters[key];
            }
        }
        const paginate = createPaginator({ perPage: filters.pageSize ?? 10 });

        return paginate<StockOutputDTO, Prisma.StockFindManyArgs>(
            this.prismaStock,
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

    async getStockById(id: string): Promise<StockOutputDTO> {
        const stock = await this.prisma.stock.findUnique({
            where: {
                id,
            },
        });

        if (!stock) throw new NotFoundException('Stock not found!');

        return stock;
    }

    async createStock(data: CreateStockDTO): Promise<StockOutputDTO> {
        const productExist = await this.prisma.product.findUnique({
            where: {
                id: data.productId,
            },
        });

        if (!productExist) throw new NotFoundException('Product not found!');

        return await this.prismaStock.create({
            data,
        });
    }

    async updateStock(idStock: string, dataUpdateStock: UpdateStockDTO) {
        const existStock = await this.prisma.stock.findUnique({
            where: {
                id: idStock,
            },
        })

        if (!existStock) throw new NotFoundException('Stock not found!');

        if (Number(dataUpdateStock.availableQuantity) < 0) throw new BadRequestException('Available quantity must be greater than 0!');

        return await this.prisma.stock.update({
            where: {
                id: idStock,
            },
            data: {
                ...dataUpdateStock
            },
        })

    }

    async deleteStock(idStock: string) {
        const stock = await this.prismaStock.findUnique({
            where: {
                id: idStock,
            },
        });

        if (!stock) throw new NotFoundException('Stock not found!');

        if (Number(stock.availableQuantity) > 0) throw new BadRequestException('Stock has available quantity!');

        return await this.prismaStock.delete({
            where: {
                id: idStock,
            },
        });
    }

}
