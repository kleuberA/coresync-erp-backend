import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { CommentsornotesService } from './commentsornotes.service';
import { Response } from 'express';

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

}
