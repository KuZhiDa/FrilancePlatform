import { Module } from '@nestjs/common';
import { CheckService } from './service/check.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';

@Module({
  providers: [CheckService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [CheckService],
})
export class CommonModule {}
