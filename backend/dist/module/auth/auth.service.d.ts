import { User } from 'src/model/users/users.model';
import { DtoForReg } from './dto/dto.register';
import { DtoForReturn } from '../../common/dto/dto.return';
import { DtoForLog } from './dto/dto.login';
import { RefreshToken } from '../../model/users/token.model';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
import { TwoFAService } from 'src/module/two_factor_auth/two_factor.service';
import { DtoFor2FaReturn } from './dto/dto.two_factor_return';
export declare class AuthService {
    private userModel;
    private refreshTokenModel;
    private redis2faService;
    private token;
    private emailService;
    constructor(userModel: typeof User, refreshTokenModel: typeof RefreshToken, redis2faService: TwoFAService, token: TokenService, emailService: EmailService);
    registerUser(dto: DtoForReg): Promise<DtoForReturn>;
    loginUser(dto: DtoForLog): Promise<DtoFor2FaReturn>;
    logoutUser(refreshToken: string): Promise<{
        message: string;
    }>;
}
