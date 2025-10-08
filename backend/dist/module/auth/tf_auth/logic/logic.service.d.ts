import { User } from 'src/model/model.user';
import { RedisTwoFAService } from 'src/module/auth/tf_auth/redis/redis.service';
import { TokenService } from 'src/module/token/token.service';
export declare class TwoFaAuthService {
    private userModel;
    private redis2faService;
    private tokenService;
    constructor(userModel: typeof User, redis2faService: RedisTwoFAService, tokenService: TokenService);
    checkAcceptedCode(id: number, code: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
