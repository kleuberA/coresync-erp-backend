import { Logistics } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class LogisticsService {

    constructor(private readonly prisma: PrismaService) { }

    async getLogisticsById(idLogistic: string): Promise<Logistics> {

        const existLogist = await this.prisma.logistics.findUnique({
            where: {
                id: idLogistic
            }
        })

        if (!existLogist) throw new BadRequestException("Logistic not found!");

        return existLogist;

    }

}
