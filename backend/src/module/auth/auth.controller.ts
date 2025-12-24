import { Body, Controller, Post, Res, Req, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoForReg } from './dto/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto/dto.login';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  postRegister(@Body() body: DtoForReg) {
    return this.authService.registerUser(body);
  }

  @Post('login')
  async postLogin(
    @Body() body: DtoForLog,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.loginUser(body);
    if (result.is2Fa) {
      return result;
    } else {
      res.cookie('token', result.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return {
        id_user: result.id_user,
        role_user: result.role,
        access: result.accessToken,
        message: result.message,
      };
    }
  }

  @Delete('logout')
  postLogout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = this.authService.logoutUser(req.cookies.token);
    res.clearCookie('token');
    return result;
  }
}
