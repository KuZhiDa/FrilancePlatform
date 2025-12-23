"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModule = void 0;
const common_1 = require("@nestjs/common");
const feedback_service_1 = require("./feedback.service");
const feedback_controller_1 = require("./feedback.controller");
const common_module_1 = require("../../common/common.module");
const sequelize_1 = require("@nestjs/sequelize");
const post_model_1 = require("../../model/customer/post.model");
const feedback_model_1 = require("../../model/users/feedback.model");
const users_model_1 = require("../../model/users/users.model");
const project_module_1 = require("../project/project.module");
const post_module_1 = require("../customer/post/post.module");
let FeedbackModule = class FeedbackModule {
};
exports.FeedbackModule = FeedbackModule;
exports.FeedbackModule = FeedbackModule = __decorate([
    (0, common_1.Module)({
        controllers: [feedback_controller_1.FeedbackController],
        providers: [feedback_service_1.FeedbackService],
        imports: [
            common_module_1.CommonModule,
            sequelize_1.SequelizeModule.forFeature([users_model_1.User, post_model_1.CustomerPost, feedback_model_1.FeedBack]),
            project_module_1.ProjectModule,
            post_module_1.PostModule,
        ],
    })
], FeedbackModule);
//# sourceMappingURL=feedback.module.js.map