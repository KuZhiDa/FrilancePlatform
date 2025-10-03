import { EmailService } from './email.service';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    patchIsActivate(token: string): Promise<{
        message: string;
    }>;
}
