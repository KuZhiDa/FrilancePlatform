import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PasswordRecoveryService } from './precovery.service';
import { dtoForUpdatePassword } from './dto/dto.update';

@Controller('reset-password')
export class PasswordRecoveryController {
  constructor(private passwordRecoveryService: PasswordRecoveryService) {}

  @Post('sand')
  async postSandEmail(@Body('login') login: string) {
    return this.passwordRecoveryService.sendEmailPassword(login);
  }

  @Get('proof')
  async getProofUpdate(@Query('token') token: string) {
    return { tokenEmail: token };
  }

  @Post('update')
  async postProofUpdate(
    @Body(new ValidationPipe()) body: dtoForUpdatePassword,
  ) {
    this.passwordRecoveryService.updatePassword(body);
  }
}
