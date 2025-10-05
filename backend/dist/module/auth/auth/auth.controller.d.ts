import { AuthService } from './auth.service';
import { DtoForReg } from './dto/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto/dto.login';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    postRegister(body: DtoForReg): Promise<import("../../../dto/dto.return").DtoForReturn>;
    postLogin(body: DtoForLog, res: Response): Promise<{
        message: string;
        Access: string;
    }>;
    postLogout(req: Request): Promise<{
        message: string;
    }>;
}
