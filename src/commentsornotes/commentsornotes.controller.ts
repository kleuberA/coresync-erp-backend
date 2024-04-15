import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CommentsornotesService } from './commentsornotes.service';
import { Response } from 'express';
import { CreateCommentsOrNotesDTO } from './DTO/create-comments-or-notes-dto';

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

}
