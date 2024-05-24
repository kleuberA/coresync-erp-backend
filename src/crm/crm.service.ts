import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrmService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllCRM() { }

}
