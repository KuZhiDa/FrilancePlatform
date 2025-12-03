import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { TokenModule } from '../token/token.module';
//import { PortfolioModule } from '../executor/portfolio/portfolio.module';
import { ProfileModule } from '../executor/profile/profile.module';

@Module({
  providers: [EmailService],
  controllers: [EmailController],
  imports: [
    TokenModule,
    EmailModule,
    SequelizeModule.forFeature([User]),
    ProfileModule,
  ],
  exports: [EmailService],
})
export class EmailModule {}
