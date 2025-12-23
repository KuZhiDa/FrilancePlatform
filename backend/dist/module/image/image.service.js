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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const image_model_1 = require("../../model/users/image.model");
const users_model_1 = require("../../model/users/users.model");
const promises_1 = __importDefault(require("fs/promises"));
let ImageService = class ImageService {
    imagesModel;
    userModel;
    constructor(imagesModel, userModel) {
        this.imagesModel = imagesModel;
        this.userModel = userModel;
    }
    async getAvatar(id_user) {
        const avatar = await this.imagesModel.findOne({
            where: { id_user },
            raw: true,
        });
        if (!avatar) {
            return { message: 'У пользователя нет загруженной аватарки.' };
        }
        try {
            const path = './public';
            await promises_1.default.access(`${path}/${avatar.name_image}`);
            return { avatar_name: avatar.name_image };
        }
        catch (err) {
            await this.imagesModel.destroy({
                where: { name_image: avatar.name_image },
            });
            return { message: 'У пользователя нет загруженной аватарки.' };
        }
    }
    async setAvatar(dto) {
        const user = await this.userModel.findOne({ where: { id: dto.id_user } });
        if (!user) {
            throw new common_1.BadRequestException('Такого пользователя нет.');
        }
        const image = await this.imagesModel.findOne({
            where: { id_user: dto.id_user },
            raw: true,
        });
        if (!image) {
            await this.imagesModel.create(dto);
        }
        else {
            await this.imagesModel.update({ url_on_image: dto.url_on_image, name_image: dto.name_image }, { where: { id_user: dto.id_user } });
            try {
                const path = './public';
                await promises_1.default.access(`${path}/${image.name_image}`);
                await promises_1.default.unlink(`${path}/${image.name_image}`);
            }
            catch (err) {
                console.error('Файл не найден в директории ./public');
            }
        }
        return { message: 'Аватарка успешно добавлена' };
    }
};
exports.ImageService = ImageService;
exports.ImageService = ImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(image_model_1.Images)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], ImageService);
//# sourceMappingURL=image.service.js.map