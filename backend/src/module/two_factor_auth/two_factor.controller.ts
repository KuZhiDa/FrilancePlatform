import { Body, Controller, Post, Res } from '@nestjs/common';
import { TwoFAService } from './two_factor.service';
import type { Response } from 'express';
import { DtoCheckCode } from './dto/ckeck-code.dto';

@Controller('two-factor-auth')
export class TwoFaController {
  constructor(private redis2faService: TwoFAService) {}

  @Post('proof-code')
  async postAcceptedCode(
    @Body() body: DtoCheckCode,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.redis2faService.checkAcceptedCode(body);
    res.cookie('token', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return {
      access: accessToken,
      message: 'Двухфакторная аутентификация пройдена.',
    };
  }
}
