import { Module } from '@nestjs/common';
import { TwoFAService } from './2fa.service';
import { TwoFaController } from './2fa.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/module/token/token.module';

@Module({
  providers: [TwoFAService],
  controllers: [TwoFaController],
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  exports: [TwoFAService],
})
export class TwoFAModule {}
