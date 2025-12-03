import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/users/token.model';
import { User } from 'src/model/users/users.model';
import { TokenModule } from '../token/token.module';
import { EmailModule } from '../email/email.module';
import { TwoFAModule } from '../two_factor_auth/two_factor.module';

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
