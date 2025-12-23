"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../../model/users/users.model");
const post_model_1 = require("../../../model/customer/post.model");
const common_module_1 = require("../../../common/common.module");
const feedback_model_1 = require("../../../model/users/feedback.model");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService],
        imports: [
            common_module_1.CommonModule,
            sequelize_1.SequelizeModule.forFeature([users_model_1.User, post_model_1.CustomerPost, feedback_model_1.FeedBack]),
        ],
        exports: [post_service_1.PostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map