import { User } from 'src/model/model.user';
import { DtoForReg } from './dto/dto.register';
import { DtoForReturn } from '../../../dto/dto.return';
import { DtoForLog } from './dto/dto.login';
import { RefreshToken } from 'src/model/model.token';
import { TokenService } from '../../token/token.service';
import { EmailService } from '../../email/email.service';
import { TwoFAService } from 'src/module/auth/tf_auth/2fa.service';
import { DtoFor2FaReturn } from './dto/dto.tfreturn';
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
