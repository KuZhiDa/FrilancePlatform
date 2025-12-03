"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const feedback_model_1 = require("../../model/users/feedback.model");
const check_service_1 = require("../../common/service/check.service");
const post_model_1 = require("../../model/customer/post.model");
const users_model_1 = require("../../model/users/users.model");
const project_service_1 = require("../project/project.service");
const sequelize_2 = require("sequelize");
const post_service_1 = require("../customer/post/post.service");
let FeedbackService = class FeedbackService {
    feedbackModel;
    postModel;
    check;
    projectService;
    postService;
    constructor(feedbackModel, postModel, check, projectService, postService) {
        this.feedbackModel = feedbackModel;
        this.postModel = postModel;
        this.check = check;
        this.projectService = projectService;
        this.postService = postService;
    }
    async createFeedBack(dto) {
        await this.check.user(dto.userId);
        await this.checkPost(dto.postId);
        await this.checkFeedback(dto.postId, dto.userId);
        await this.feedbackModel.create(dto);
        return { message: 'Отклик прошел успешно.' };
    }
    async getFeedbacks(dto) {
        const where = {};
        if (dto.userId) {
            where.user_id = dto.userId;
        }
        else if (dto.postId) {
            where.post_id = dto.postId;
        }
        const feedbackData = await this.feedbackModel.findAll({
            where,
            include: [
                {
                    model: post_model_1.CustomerPost,
                    as: 'post',
                    attributes: ['project_name', 'description', 'price'],
                },
                {
                    model: users_model_1.User,
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
                [{ model: users_model_1.User, as: 'executor' }, 'createdAt'],
            ],
        });
        const resultFeedbacks = feedbackData.map((feedback) => {
            feedback = feedback.get({ plain: true });
            let executorNew;
            if (feedback.executor.rating_count > 0) {
                executorNew = {
                    rating: feedback.executor.rating_sum / feedback.executor.rating_count,
                    ...feedback.executor,
                };
            }
            else {
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
    async acceptFeedback(feedbackId, dto) {
        const feedbackData = (await this.feedbackModel.findOne({
            attributes: [
                [sequelize_2.Sequelize.col('post.project_name'), 'projectName'],
                [sequelize_2.Sequelize.col('user_id'), 'executorId'],
                [sequelize_2.Sequelize.col('post.id_user'), 'customerId'],
                [sequelize_2.Sequelize.col('suggested_price'), 'suggestedPrice'],
                [sequelize_2.Sequelize.col('post_id'), 'postId'],
            ],
            include: [{ model: post_model_1.CustomerPost, attributes: [] }],
            where: { id: feedbackId },
            raw: true,
        }));
        if (!feedbackData) {
            throw new common_1.HttpException('Такого отзыва нет.', common_1.HttpStatus.NOT_FOUND);
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
    async rejectFeedback(feedbackId) {
        const feedbackData = await this.feedbackModel.findOne({
            where: { id: feedbackId },
        });
        if (!feedbackData) {
            throw new common_1.HttpException('Такого отклика нет.', common_1.HttpStatus.NOT_FOUND);
        }
        await this.feedbackModel.destroy({ where: { id: feedbackId } });
    }
    async checkPost(postId) {
        const postData = await this.postModel.findOne({ where: { id: postId } });
        if (!postData) {
            throw new common_1.HttpException('Такого поста нет.', common_1.HttpStatus.NOT_FOUND);
        }
        return postData;
    }
    async checkFeedback(postId, userId) {
        const feedbackData = await this.feedbackModel.findOne({
            where: { postId, userId },
        });
        if (feedbackData) {
            throw new common_1.HttpException('Отклик уже существует.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(feedback_model_1.FeedBack)),
    __param(1, (0, sequelize_1.InjectModel)(post_model_1.CustomerPost)),
    __metadata("design:paramtypes", [Object, Object, check_service_1.CheckService,
        project_service_1.ProjectService,
        post_service_1.PostService])
], FeedbackService);
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=feedback.service.js.map