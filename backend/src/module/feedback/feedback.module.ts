import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { CommonModule } from 'src/common/common.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerPost } from 'src/model/customer/post.model';
import { FeedBack } from 'src/model/users/feedback.model';
import { User } from 'src/model/users/users.model';
import { ProjectModule } from '../project/project.module';
import { PostModule } from '../customer/post/post.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [
    CommonModule,
    SequelizeModule.forFeature([User, CustomerPost, FeedBack]),
    ProjectModule,
    PostModule,
  ],
})
export class FeedbackModule {}
