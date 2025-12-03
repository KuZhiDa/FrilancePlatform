import { Controller, Param, Post, Put, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Put('proof')
  async getIsActivate(@Query('token') token: string) {
    return this.emailService.updateIsActivate(token);
  }

  @Post('send/:id')
  async PostRetryMessage(@Param('id') id_user: number) {
    return this.emailService.messageEmail(id_user);
  }
}
