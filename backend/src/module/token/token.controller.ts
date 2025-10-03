import { Controller, Patch, Req} from '@nestjs/common';
import { TokenService } from './token.service';
import type { Request } from 'express';

@Controller('token')
export class TokenController {
    constructor(private tokenService: TokenService){}

    @Patch()
    async postRefresh(@Req() req: Request){
        this.tokenService.refreshUpdate(req)
    }
}
