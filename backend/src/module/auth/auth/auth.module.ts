import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/model.token';
import { User } from 'src/model/model.user';
import { TokenModule } from '../../token/token.module';
import { EmailModule } from '../../email/email.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [SequelizeModule.forFeature([User, RefreshToken]), TokenModule, EmailModule]
})
export class AuthModule {}
