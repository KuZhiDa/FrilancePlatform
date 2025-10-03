import { User } from 'src/model/model.user';
import { TokenService } from '../token/token.service';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private userModel;
    private token;
    private nodemailer;
    constructor(userModel: typeof User, token: TokenService, nodemailer: MailerService);
    updateIsActivate(tokenEmail: string): Promise<{
        message: string;
    }>;
    messageToEmail(to: string, subject: string, text: string): Promise<void>;
}
