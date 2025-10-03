import { User } from 'src/model/model.user';
import { DtoForReg } from './dto.auth/dto.register';
import { DtoForReturn } from '../../dto/dto.return';
import { DtoForLog } from './dto.auth/dto.login';
import { RefreshToken } from 'src/model/model.token';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private userModel;
    private refreshTokenModel;
    private token;
    private emailService;
    constructor(userModel: typeof User, refreshTokenModel: typeof RefreshToken, token: TokenService, emailService: EmailService);
    registerUser(dto: DtoForReg): Promise<DtoForReturn>;
    loginUser(dto: DtoForLog): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logoutUser(refreshToken: string): Promise<{
        message: string;
    }>;
}
