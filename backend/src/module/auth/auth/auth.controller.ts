import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoForReg } from './dto/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto/dto.login';
import { LoginGuard } from 'src/guard/guard.login';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('reg')
  postRegister(@Body(new ValidationPipe()) body: DtoForReg) {
    return this.authService.registerUser(body);
  }

  @Post('login')
  @UseGuards(LoginGuard)
  async postLogin(
    @Body() body: DtoForLog,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginUser(body);
    if (result.is2Fa) {
      return result.message;
    } else {
      res.cookie('token', result.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return { access: result.accessToken, message: result.message };
    }
  }

  @Post('logout')
  postLogout(@Req() req: Request) {
    return this.authService.logoutUser(req.cookies.token);
  }
}
