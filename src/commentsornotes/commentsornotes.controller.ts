import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { UpdateCommentsOrNotesDTO } from './DTO/update-comments-or-notes-dto';
import { CreateCommentsOrNotesDTO } from './DTO/create-comments-or-notes-dto';
import { CommentsornotesService } from './commentsornotes.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags("Comments or Notes")
@Controller('commentsornotes')
export class CommentsornotesController {
    constructor(private readonly commentsornotesService: CommentsornotesService) { }

    @Get()
    async getCommentsOrNotesByProduct(@Res() res: Response) {
        try {
            const comments = await this.commentsornotesService.getCommentsOrNotesByProduct();
            return res.status(HttpStatus.OK).json({ message: 'Comments or notes fetched successfully!', data: comments });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error fetching comments or notes!', error: error.message });
        }
    }

    @Post("/create")
    async createCommentsOrNotes(@Res() res: Response, @Body() commentsOrNotesData: CreateCommentsOrNotesDTO) {
        try {
            const comments = await this.commentsornotesService.createCommentsOrNotes(commentsOrNotesData);
            return res.status(HttpStatus.OK).json({ message: 'Comments or notes created successfully!', data: comments });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating comments or notes!', error: error.message });
        }
    }

    @Patch("/update/:id")
    async updateCommentsOrNotes(@Res() res: Response, @Param('id') id: string, @Body() commentsOrNotesData: UpdateCommentsOrNotesDTO) {
        try {
            const comments = await this.commentsornotesService.updateCommentsOrNotes(id, commentsOrNotesData);
            return res.status(HttpStatus.OK).json({ message: 'Comments or notes updated successfully!', data: comments });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating comments or notes!', error: error.message });
        }
    }

    @Delete("/delete/:id/:userId/:companyId")
    async deleteCommentsOrNotes(@Res() res: Response, @Param('id') id: string, @Param('userId') userId: string, @Param('companyId') companyId: string) {
        try {
            await this.commentsornotesService.deleteCommentsOrNotes(id, userId, companyId);
            return res.status(HttpStatus.OK).json({ message: 'Comments or notes deleted successfully!' });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error deleting comments or notes!', error: error.message });
        }
    }

}
