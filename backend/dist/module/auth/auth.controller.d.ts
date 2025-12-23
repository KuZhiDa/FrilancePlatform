import { AuthService } from './auth.service';
import { DtoForReg } from './dto/dto.register';
import type { Response, Request } from 'express';
import { DtoForLog } from './dto/dto.login';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    postRegister(body: DtoForReg): Promise<import("../../common/dto/dto.return").DtoForReturn>;
    postLogin(body: DtoForLog, res: Response): Promise<import("./dto/dto.two_factor_return").DtoFor2FaReturn | {
        id_user: number;
        role_user: import("../../common/constant/roles").Role;
        access: string | undefined;
        message: string;
    }>;
    postLogout(req: Request, res: Response): Promise<{
        message: string;
    }>;
}
