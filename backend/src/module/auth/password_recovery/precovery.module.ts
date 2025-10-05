import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './precovery.service';
import { PasswordRecoveryController } from './precovery.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { TokenModule } from 'src/module/token/token.module';
import { EmailModule } from 'src/module/email/email.module';

@Module({
	providers: [PasswordRecoveryService],
	controllers: [PasswordRecoveryController],
	imports: [SequelizeModule.forFeature([User]), TokenModule, EmailModule]
})
export class PasswordRecoveryModule {}
