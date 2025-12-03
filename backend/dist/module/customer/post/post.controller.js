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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const params_dto_1 = require("./dto/params.dto");
const guard_jwt_1 = require("../../../common/guard/guard.jwt");
let PostController = class PostController {
    postService;
    constructor(postService) {
        this.postService = postService;
    }
    async getGlobalPosts(dto, user) {
        console.log(user);
        return await this.postService.getListPost(dto, user.user);
    }
    async getCustomerPosts(id_user) {
        return await this.postService.getInfoPost(id_user);
    }
    async postPost(id, dto) {
        console.log(dto);
        return await this.postService.addPost(id, dto);
    }
    async patchPost(id, dto) {
        return await this.postService.updatePost(id, dto);
    }
    async deletePost(id) {
        return await this.postService.deletePost(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_jwt_1.JwtAccessAuthGuard),
    (0, common_1.Get)('global'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [params_dto_1.paramsSelectDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getGlobalPosts", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getCustomerPosts", null);
__decorate([
    (0, common_1.Post)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_dto_1.PostCreateDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postPost", null);
__decorate([
    (0, common_1.Patch)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_dto_1.PostUpdateDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "patchPost", null);
__decorate([
    (0, common_1.Delete)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map