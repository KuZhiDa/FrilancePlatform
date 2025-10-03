import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [TokenModule, EmailModule,SequelizeModule.forFeature([User])],
  exports: [EmailService]
})
export class EmailModule {}
