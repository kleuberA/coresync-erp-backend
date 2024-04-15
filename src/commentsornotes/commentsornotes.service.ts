import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentsOrNotesDTO } from './DTO/create-comments-or-notes-dto';

@Injectable()
export class CommentsornotesService {
    constructor(private readonly prisma: PrismaService) { }

    async getCommentsOrNotesByProduct() {
        return this.prisma.commentsOrNotes.findMany({
            include: {
                product: true
            }
        });
    }

    async createCommentsOrNotes(commentsOrNotesData: CreateCommentsOrNotesDTO) {
        const productExist = await this.prisma.product.findUnique({
            where: { id: commentsOrNotesData.productId }
        });

        if (!productExist) {
            throw new Error('Product does not exist!');
        }

        return await this.prisma.commentsOrNotes.create({
            data: {
                ...commentsOrNotesData
            }
        });

    }

}
