import { Module } from '@nestjs/common';
import { WorkInfoService } from './work-info.service';
import { WorkInfoController } from './work-info.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { WorkInfoExecutor } from 'src/model/executor/work_Info/work_info.model';
import { ProjectExecutor } from 'src/model/executor/work_Info/projects.model';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [WorkInfoController],
  providers: [WorkInfoService],
  imports: [
    CommonModule,
    SequelizeModule.forFeature([WorkInfoExecutor, ProjectExecutor]),
  ],
})
export class WorkInfoModule {}
