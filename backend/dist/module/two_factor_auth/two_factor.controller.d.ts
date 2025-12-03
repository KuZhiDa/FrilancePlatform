import { TwoFAService } from './two_factor.service';
import type { Response } from 'express';
import { DtoCheckCode } from './dto/ckeck-code.dto';
export declare class TwoFaController {
    private redis2faService;
    constructor(redis2faService: TwoFAService);
    postAcceptedCode(body: DtoCheckCode, res: Response): Promise<{
        access: string;
        message: string;
    }>;
}
