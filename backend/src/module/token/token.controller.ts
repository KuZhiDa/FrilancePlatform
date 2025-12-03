import { Controller, Patch, Req, Res } from '@nestjs/common';
import { TokenService } from './token.service';
import type { Request, Response } from 'express';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Patch()
  async postRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.tokenService.refreshUpdate(
      req.cookies.token,
      res,
    );
    return result;
  }
}
