import { Body, Controller, Post } from '@nestjs/common';
import { PasswordRecoveryService } from './pass_recovery.service';
import { dtoForUpdatePassword } from './dto/update-password.dto';

@Controller('reset-password')
export class PasswordRecoveryController {
  constructor(private passwordRecoveryService: PasswordRecoveryService) {}

  @Post('sand')
  async postSandEmail(@Body('login') login: string) {
    return this.passwordRecoveryService.sendEmailPassword(login);
  }

  @Post('update')
  async postProofUpdate(@Body() body: dtoForUpdatePassword) {
    return this.passwordRecoveryService.updatePassword(body);
  }
}
