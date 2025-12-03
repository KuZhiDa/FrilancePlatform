import { PasswordRecoveryService } from './pass_recovery.service';
import { dtoForUpdatePassword } from './dto/update-password.dto';
export declare class PasswordRecoveryController {
    private passwordRecoveryService;
    constructor(passwordRecoveryService: PasswordRecoveryService);
    postSandEmail(login: string): Promise<{
        message: string;
    }>;
    postProofUpdate(body: dtoForUpdatePassword): Promise<{
        message: string;
    }>;
}
