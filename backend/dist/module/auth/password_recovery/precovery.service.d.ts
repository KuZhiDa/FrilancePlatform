import { User } from 'src/model/model.user';
import { TokenService } from 'src/module/token/token.service';
import { EmailService } from 'src/module/email/email.service';
import { dtoForUpdatePassword } from './dto/dto.pupdate';
export declare class PasswordRecoveryService {
    private userModel;
    private tokenService;
    private emailService;
    constructor(userModel: typeof User, tokenService: TokenService, emailService: EmailService);
    sendEmailPassword(login: string): Promise<{
        message: string;
    }>;
    updatePassword(dto: dtoForUpdatePassword): Promise<{
        message: string;
    }>;
}
