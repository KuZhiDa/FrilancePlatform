import Redis from 'ioredis';
import { User } from 'src/model/model.user';
import { TokenService } from 'src/module/token/token.service';
export declare class RedisTwoFAService {
    private redis;
    private userModel;
    private tokenService;
    constructor(redis: Redis, userModel: typeof User, tokenService: TokenService);
    genCode(id_user: number): Promise<string>;
    proofCode(id_user: number, code: string): Promise<boolean>;
    checkAcceptedCode(id: number, code: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
