import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { CustomerPost } from 'src/model/customer/post.model';
import { CommonModule } from 'src/common/common.module';
import { FeedBack } from 'src/model/users/feedback.model';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    CommonModule,
    SequelizeModule.forFeature([User, CustomerPost, FeedBack]),
  ],
  exports: [PostService],
})
export class PostModule {}
