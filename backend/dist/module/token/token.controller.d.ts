import { TokenService } from './token.service';
import type { Request } from 'express';
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    postRefresh(req: Request): Promise<void>;
}
