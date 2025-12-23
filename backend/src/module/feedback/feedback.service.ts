import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FeedBack } from 'src/model/users/feedback.model';
import { FeedbackCreateDto } from './dto/create.dto';
import { CheckService } from 'src/common/service/check.service';
import { CustomerPost } from 'src/model/customer/post.model';
import { User } from 'src/model/users/users.model';
import { GetDto } from './dto/get.dto';
import { acceptDto } from './dto/accept.dto';
import { ProjectService } from '../project/project.service';
import { ProjectInterface } from './interface/project.interface';
import { Sequelize } from 'sequelize';
import { PostService } from '../customer/post/post.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(FeedBack) private feedbackModel: typeof FeedBack,
    @InjectModel(CustomerPost) private postModel: typeof CustomerPost,
    private check: CheckService,
    private projectService: ProjectService,
    private postService: PostService,
  ) {}

  async createFeedBack(dto: FeedbackCreateDto): Promise<{ message: string }> {
    await this.check.user(dto.userId);
    await this.checkPost(dto.postId);
    await this.checkFeedback(dto.postId, dto.userId);
    await this.feedbackModel.create(dto);
    return { message: 'Отклик прошел успешно.' };
  }

  async getFeedbacks(dto: GetDto) {
    const where: any = {};
    if (dto.userId) {
      where.user_id = dto.userId;
    } else if (dto.postId) {
      where.post_id = dto.postId;
    }

    const feedbackData = await this.feedbackModel.findAll({
      where,
      include: [
        {
          model: CustomerPost,
          as: 'post',
          attributes: ['project_name', 'description', 'price'],
        },
        {
          model: User,
          as: 'executor',
          attributes: [
            'id',
            'username',
            'rating_sum',
            'rating_count',
            'createdAt',
          ],
        },
      ],
      order: [
        'suggested_price',
        [{ model: User, as: 'executor' }, 'createdAt'],
      ],
    });
    console.log(feedbackData[0].dataValues.executor);
    const resultFeedbacks = feedbackData.map((feedback) => {
      feedback = feedback.get({ plain: true });
      let executorNew;
      if (feedback.executor.rating_count > 0) {
        executorNew = {
          rating: feedback.executor.rating_sum / feedback.executor.rating_count,
          ...feedback.executor,
        };
      } else {
        executorNew = {
          rating: 0,
          ...feedback,
        };
      }
      feedback.executor = executorNew;
      return feedback;
    });
    return resultFeedbacks;
  }

  async acceptFeedback(feedbackId: number, dto: acceptDto) {
    const feedbackData = (await this.feedbackModel.findOne({
      attributes: [
        [Sequelize.col('post.project_name'), 'projectName'],
        [Sequelize.col('user_id'), 'executorId'],
        [Sequelize.col('post.id_user'), 'customerId'],
        [Sequelize.col('suggested_price'), 'suggestedPrice'],
        [Sequelize.col('post_id'), 'postId'],
      ],
      include: [{ model: CustomerPost, attributes: [] }],
      where: { id: feedbackId },
      raw: true,
    })) as unknown as ProjectInterface;
    if (!feedbackData) {
      throw new HttpException('Такого отзыва нет.', HttpStatus.NOT_FOUND);
    }
    await this.projectService.addProject({
      projectName: feedbackData.projectName,
      executorId: feedbackData.executorId,
      customerId: feedbackData.customerId,
      deadlineDate: dto.deadlineDate,
      price: feedbackData.suggestedPrice,
    });

    await this.postService.deletePost(feedbackData.postId);
    return { message: 'Отклик подтвержден.' };
  }

  async rejectFeedback(feedbackId: number) {
    const feedbackData = await this.feedbackModel.findOne({
      where: { id: feedbackId },
    });
    if (!feedbackData) {
      throw new HttpException('Такого отклика нет.', HttpStatus.NOT_FOUND);
    }
    await this.feedbackModel.destroy({ where: { id: feedbackId } });
  }

  async checkPost(postId: number) {
    const postData = await this.postModel.findOne({ where: { id: postId } });
    if (!postData) {
      throw new HttpException('Такого поста нет.', HttpStatus.NOT_FOUND);
    }
  }

  async checkFeedback(postId: number, userId: number) {
    const feedbackData = await this.feedbackModel.findOne({
      where: { postId, userId },
    });
    if (feedbackData) {
      throw new HttpException('Отклик уже существует.', HttpStatus.BAD_REQUEST);
    }
  }
}
