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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const check_service_1 = require("../../../common/service/check.service");
const post_model_1 = require("../../../model/customer/post.model");
const sequelize_2 = require("sequelize");
let PostService = class PostService {
    postModel;
    check;
    constructor(postModel, check) {
        this.postModel = postModel;
        this.check = check;
    }
    async getListPost(dto, user) {
        const where = {};
        if (dto.like) {
            where.projectName = { [sequelize_2.Op.like]: `%${dto.like}%` };
        }
        where.price = {
            [sequelize_2.Op.between]: [
                Number(dto.priceMin) || 0,
                Number(dto.priceMax) || 1000000,
            ],
        };
        const order = [];
        if (dto.sortedColumn) {
            order.push([dto.sortedColumn, dto.sortedParam || 'ASC']);
        }
        const posts = await this.postModel.findAll({
            attributes: ['id', 'projectName', 'description', 'price'],
            where: { ...where, id_user: { [sequelize_2.Op.ne]: user.id_user } },
            order,
            offset: dto.offset,
            limit: dto.limit,
        });
        const resultPosts = posts.map((post) => {
            return post.get({ plain: true });
        });
        return resultPosts;
    }
    async getInfoPost(id_user) {
        const userData = await this.check.user(id_user);
        if (!userData.isActivate) {
            throw new common_1.HttpException('Почта пользователя не подтверждена.', common_1.HttpStatus.BAD_REQUEST);
        }
        const postsData = await this.postModel.findAll({
            where: { id_user },
            raw: true,
        });
        return postsData;
    }
    async addPost(id_user, dto) {
        await this.check.user(id_user);
        const postData = await this.postModel.findOne({
            where: {
                projectName: dto.projectName,
                description: dto.description,
                price: dto.price,
            },
            raw: true,
        });
        if (postData) {
            throw new common_1.HttpException('Такой пост уже создан.', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = (await this.postModel.create({ id_user, ...dto }, { returning: ['id'] })).get({
            plain: true,
        });
        return { id: result.id };
    }
    async updatePost(id, dto) {
        await this.checkPost(id);
        await this.postModel.update(dto, { where: { id } });
        return { message: 'Данные поста успешно обновлены.' };
    }
    async deletePost(id) {
        await this.checkPost(id);
        await this.postModel.destroy({ where: { id } });
        return { message: 'Данные поста успешно удалены.' };
    }
    async checkPost(id) {
        const postData = await this.postModel.findOne({ where: { id } });
        if (!postData) {
            throw new common_1.HttpException('Такого поста нет.', common_1.HttpStatus.NOT_FOUND);
        }
        return postData;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(post_model_1.CustomerPost)),
    __metadata("design:paramtypes", [Object, check_service_1.CheckService])
], PostService);
//# sourceMappingURL=post.service.js.map