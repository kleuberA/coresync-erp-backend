import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

}
