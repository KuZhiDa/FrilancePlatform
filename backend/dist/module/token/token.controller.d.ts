/// <reference types="cookie-parser" />
import { TokenService } from './token.service';
import type { Request, Response } from 'express';
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    postRefresh(req: Request, res: Response): Promise<{
        access: string;
    }>;
}
