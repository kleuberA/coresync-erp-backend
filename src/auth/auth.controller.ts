import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Response,
    UseGuards,
} from '@nestjs/common';
import { IsPublic } from './decorators/ispublic.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthRequest } from './dto/AuthRequest';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest, @Response() res) {
        const access_token = await this.authService.login(req.user);
        res.cookie('accessToken', access_token, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            sameSite: 'strict',
            httpOnly: true,
        });
        return res.json(access_token);
    }
}
