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

    async deleteCommentsOrNotes(id: string, userId: string, companyId: string) {
        const existCommentsOrNotes = await this.prisma.commentsOrNotes.findUnique({
            where: { id }
        });

        if (!existCommentsOrNotes) throw new Error('Comments or Notes does not exist!');

        await this.permissionUser(userId, companyId, 'delete');

        return await this.prisma.commentsOrNotes.delete({
            where: { id }
        })

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
