import { Controller, Get, Patch, Query } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get('proof')
  async getIsActivate(@Query('token') token: string) {
    return this.emailService.updateIsActivate(token);
  }
}
