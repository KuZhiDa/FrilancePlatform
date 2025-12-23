import { Test, type TestingModule } from '@nestjs/testing';
import { FeedbackService } from '../feedback.service';
import { getModelToken } from '@nestjs/sequelize';
import { FeedBack } from '../../../model/users/feedback.model';
import { CustomerPost } from '../../../model/customer/post.model';
import {
  mockCheckService,
  mockCustomerPostModel,
  mockFeedbackModel,
  mockPostService,
  mockProjectService,
} from './feedback.mock';
import { CheckService } from '../../../common/service/check.service';
import { PostService } from '../../customer/post/post.service';
import { ProjectService } from '../../project/project.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FeedbackService', () => {
  let service: FeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        { provide: getModelToken(FeedBack), useValue: mockFeedbackModel },
        {
          provide: getModelToken(CustomerPost),
          useValue: mockCustomerPostModel,
        },
        {
          provide: CheckService,
          useValue: mockCheckService,
        },
        {
          provide: PostService,
          useValue: mockCustomerPostModel,
        },
        {
          provide: ProjectService,
          useValue: mockCustomerPostModel,
        },
      ],
    }).compile();

    service = module.get(FeedbackService);
  });

  describe('createFeedBack', () => {
    it('should successfully create feedback', async () => {
      mockCheckService.user.mockResolvedValue({
        dataValues: { id: 2, username: 'Dimasik' },
      });
      jest.spyOn(service, 'checkPost').mockResolvedValue();
      jest.spyOn(service, 'checkFeedback').mockResolvedValue();
      mockFeedbackModel.create.mockResolvedValue(true);
      const result = await service.createFeedBack({
        userId: 2,
        postId: 3,
        suggestedPrice: 1000,
      });
      expect(result).toEqual({ message: 'Отклик прошел успешно.' });
    });
    it('rejected post', async () => {
      mockCheckService.user.mockResolvedValue({
        dataValues: { id: 2, username: 'Dimasik' },
      });
      jest
        .spyOn(service, 'checkPost')
        .mockRejectedValue(
          new HttpException('Такого поста нет.', HttpStatus.NOT_FOUND),
        );
      await expect(
        service.createFeedBack({
          userId: 2,
          postId: 3,
          suggestedPrice: 1000,
        }),
      ).rejects.toThrow('Такого поста нет.');
    });
  });

  describe('rejectFeedback', () => {
    it('should throw if feedback not found', async () => {
      mockFeedbackModel.findOne.mockResolvedValue(null);

      await expect(service.rejectFeedback(1)).rejects.toThrow(
        new HttpException('Такого отклика нет.', HttpStatus.NOT_FOUND),
      );
    });

    it('should destroy feedback if exists', async () => {
      mockFeedbackModel.findOne.mockResolvedValue({ id: 1 });
      mockFeedbackModel.destroy.mockResolvedValue(1);

      await service.rejectFeedback(1);

      expect(mockFeedbackModel.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('checkPost', () => {
    it('should throw if post not found', async () => {
      mockCustomerPostModel.findOne.mockResolvedValue(null);

      await expect(service.checkPost(1)).rejects.toThrow(
        new HttpException('Такого поста нет.', HttpStatus.NOT_FOUND),
      );
    });

    it('should resolve if post exists', async () => {
      mockCustomerPostModel.findOne.mockResolvedValue({ id: 1 });

      await expect(service.checkPost(1)).resolves.toBeUndefined();
    });
  });

  describe('checkFeedback', () => {
    it('should throw if feedback already exists', async () => {
      mockFeedbackModel.findOne.mockResolvedValue({ id: 1 });

      await expect(service.checkFeedback(1, 2)).rejects.toThrow(
        new HttpException('Отклик уже существует.', HttpStatus.BAD_REQUEST),
      );
    });

    it('should resolve if feedback does not exist', async () => {
      mockFeedbackModel.findOne.mockResolvedValue(null);

      await expect(service.checkFeedback(1, 2)).resolves.toBeUndefined();
    });
  });
});
