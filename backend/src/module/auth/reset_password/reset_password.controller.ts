import { Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';

@Controller('reset-password')
export class ResetPasswordController {
    constructor(private reset_passwordService: ResetPasswordService){}

    @Post('proof')
    async postProofEmail(){
        
    }

    @Post('update')
    async postUpdatePassword(){

    }
}
