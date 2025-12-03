import { Module } from '@nestjs/common';
import { TwoFAService } from './two_factor.service';
import { TwoFaController } from './two_factor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from 'src/module/token/token.module';

@Module({
  providers: [TwoFAService],
  controllers: [TwoFaController],
  imports: [SequelizeModule.forFeature([User]), TokenModule],
  exports: [TwoFAService],
})
export class TwoFAModule {}
