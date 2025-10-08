import { EmailService } from './email.service';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    getIsActivate(token: string): Promise<{
        message: string;
    }>;
}
