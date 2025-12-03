import Redis from 'ioredis';
import { User } from 'src/model/users/users.model';
import { TokenService } from 'src/module/token/token.service';
import { DtoCheckCode } from './dto/ckeck-code.dto';
export declare class TwoFAService {
    private redis;
    private userModel;
    private tokenService;
    constructor(redis: Redis, userModel: typeof User, tokenService: TokenService);
    genCode(id_user: number): Promise<string>;
    proofCode(id_user: number, code: string): Promise<boolean>;
    checkAcceptedCode(req: DtoCheckCode): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
