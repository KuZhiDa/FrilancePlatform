import { PasswordRecoveryService } from './precovery.service';
import { dtoForUpdatePassword } from './dto/dto.pupdate';
export declare class PasswordRecoveryController {
    private passwordRecoveryService;
    constructor(passwordRecoveryService: PasswordRecoveryService);
    postSandEmail(login: string): Promise<{
        message: string;
    }>;
    getProofUpdate(token: string): Promise<{
        tokenEmail: string;
    }>;
    postProofUpdate(body: dtoForUpdatePassword): Promise<void>;
}
