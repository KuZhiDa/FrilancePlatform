import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './pass_recovery.service';
import { PasswordRecoveryController } from './pas_recovery.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { TokenModule } from 'src/module/token/token.module';
import { EmailModule } from 'src/module/email/email.module';

@Module({
  providers: [PasswordRecoveryService],
  controllers: [PasswordRecoveryController],
  imports: [SequelizeModule.forFeature([User]), TokenModule, EmailModule],
})
export class PasswordRecoveryModule {}
