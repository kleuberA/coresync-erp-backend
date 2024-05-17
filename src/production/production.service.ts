import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductionService {
    constructor(private readonly prisma: PrismaService) { }

    async getProductionById(idProduction: string) {
        const productionExist = await this.prisma.production.findUnique({
            where: {
                id: idProduction
            }
        })

        if (!productionExist) throw new BadRequestException('Production not found!');

        return productionExist;

    }

}
