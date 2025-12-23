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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../model/users/users.model");
const image_service_1 = require("../image/image.service");
let UsersService = class UsersService {
    userModel;
    imageService;
    constructor(userModel, imageService) {
        this.userModel = userModel;
        this.imageService = imageService;
    }
    async getInfo(id_user) {
        const data = await this.userModel.findOne({
            attributes: [
                'username',
                'email',
                'phone_number',
                'rating_count',
                'rating_sum',
            ],
            where: { id: id_user },
            raw: true,
        });
        if (!data) {
            throw new common_1.BadRequestException('Пользователя с таким id нет.');
        }
        let resultData;
        if (data.rating_count > 0) {
            resultData = {
                rating: data.rating_sum / data.rating_count,
                ...data,
            };
        }
        else {
            resultData = {
                rating: 0,
                ...data,
            };
        }
        const imageInfo = await this.imageService.getAvatar(id_user);
        return { resultData, imageInfo };
    }
    async updateInfo(id_user, dto) {
        const data = await this.userModel.findOne({
            where: { id: id_user },
            raw: true,
        });
        if (!data) {
            throw new common_1.BadRequestException('Пользователя с таким id нет.');
        }
        await this.userModel.update(dto, { where: { id: id_user } });
        return { message: 'Данные успешно обновлены.' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, image_service_1.ImageService])
], UsersService);
//# sourceMappingURL=users.service.js.map