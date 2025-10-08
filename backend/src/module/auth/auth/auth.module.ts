import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/model.token';
import { User } from 'src/model/model.user';
import { TokenModule } from '../../token/token.module';
import { EmailModule } from '../../email/email.module';
import { TwoFAModule } from '../tf_auth/2fa.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    SequelizeModule.forFeature([User, RefreshToken]),
    TokenModule,
    EmailModule,
    TwoFAModule,
  ],
})
export class AuthModule {}
