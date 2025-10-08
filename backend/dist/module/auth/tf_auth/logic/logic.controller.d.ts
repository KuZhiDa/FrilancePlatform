import { TwoFaAuthService } from './logic.service';
import Redis from 'ioredis';
import type { Response } from 'express';
export declare class TwoFaAuthController {
    private redis;
    private twoFaService;
    constructor(redis: Redis, twoFaService: TwoFaAuthService);
    postAcceptedCode(id: number, code: string, res: Response): Promise<{
        access: string;
        message: string;
    }>;
}
