import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { orderProject } from 'src/model/users/project.model';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [SequelizeModule.forFeature([User, orderProject]), CommonModule],
  exports: [ProjectService],
})
export class ProjectModule {}
