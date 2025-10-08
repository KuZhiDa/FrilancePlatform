import { RedisTwoFAService } from './redis.service';
import type { Response } from 'express';
export declare class RedisTwoFAController {
    private redis2faService;
    constructor(redis2faService: RedisTwoFAService);
    postSet(): Promise<void>;
    postGet(): Promise<boolean>;
    postAcceptedCode(id: number, code: string, res: Response): Promise<{
        access: string;
        message: string;
    }>;
}
