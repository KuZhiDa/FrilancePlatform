import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset_password.service';
import { ResetPasswordController } from './reset_password.controller';

@Module({
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController]
})
export class ResetPasswordModule {}
