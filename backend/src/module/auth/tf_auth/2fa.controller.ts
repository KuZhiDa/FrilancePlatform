import { Body, Controller, Post, Query, Res } from '@nestjs/common';
import { TwoFAService } from './2fa.service';
import type { Response } from 'express';

@Controller('redis2fa')
export class TwoFaController {
  constructor(private redis2faService: TwoFAService) {}

  @Post('set')
  async postSet() {
    this.redis2faService.genCode(15);
  }

  @Post('get')
  async postGet() {
    return this.redis2faService.proofCode(15, '342395');
  }

  @Post('proof-code')
  async postAcceptedCode(
    @Query('id') id: number,
    @Body('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.redis2faService.checkAcceptedCode(id, code);
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
