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
exports.FeedbackController = void 0;
const common_1 = require("@nestjs/common");
const feedback_service_1 = require("./feedback.service");
const create_dto_1 = require("./dto/create.dto");
const get_dto_1 = require("./dto/get.dto");
const accept_dto_1 = require("./dto/accept.dto");
let FeedbackController = class FeedbackController {
    feedbackService;
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async postFeedBack(dto) {
        return await this.feedbackService.createFeedBack(dto);
    }
    async getFeedBack(dto) {
        return await this.feedbackService.getFeedbacks(dto);
    }
    async acceptFeedback(dto, feedbackId) {
        return await this.feedbackService.acceptFeedback(feedbackId, dto);
    }
    async rejectFeedback(feedbackId) {
        await await this.feedbackService.rejectFeedback(feedbackId);
    }
};
exports.FeedbackController = FeedbackController;
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.FeedbackCreateDto]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "postFeedBack", null);
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_dto_1.GetDto]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "getFeedBack", null);
__decorate([
    (0, common_1.Post)('accept'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('feedbackId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accept_dto_1.acceptDto, Number]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "acceptFeedback", null);
__decorate([
    (0, common_1.Delete)('reject'),
    __param(0, (0, common_1.Query)('feedbackId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FeedbackController.prototype, "rejectFeedback", null);
exports.FeedbackController = FeedbackController = __decorate([
    (0, common_1.Controller)('feedback'),
    __metadata("design:paramtypes", [feedback_service_1.FeedbackService])
], FeedbackController);
//# sourceMappingURL=feedback.controller.js.map