import { TwoFAService } from './2fa.service';
import type { Response } from 'express';
export declare class TwoFaController {
    private redis2faService;
    constructor(redis2faService: TwoFAService);
    postSet(): Promise<void>;
    postGet(): Promise<boolean>;
    postAcceptedCode(id: number, code: string, res: Response): Promise<{
        access: string;
        message: string;
    }>;
}
