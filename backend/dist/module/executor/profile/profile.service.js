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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const profiles_model_1 = require("../../../model/executor/profiles.model");
const users_model_1 = require("../../../model/users/users.model");
let ProfileService = class ProfileService {
    userModel;
    profileModel;
    constructor(userModel, profileModel) {
        this.userModel = userModel;
        this.profileModel = profileModel;
    }
    async checkUser(id_user) {
        const userData = await this.userModel.findOne({
            where: { id: id_user },
            raw: true,
        });
        if (!userData) {
            throw new common_1.BadRequestException('Пользователя с таким id нет.');
        }
    }
    async checkProfile(id_user) {
        const profileData = await this.profileModel.findOne({
            where: { id_user },
            raw: true,
        });
        if (!profileData) {
            throw new common_1.BadRequestException('У пользователя с таким id нет профиля.');
        }
    }
    async getInfo(id_user) {
        const userData = await this.userModel.findOne({
            where: { id: id_user },
            raw: true,
        });
        if (!userData) {
            throw new common_1.BadRequestException('Пользователя с таким id нет.');
        }
        if (!userData.isActivate) {
            throw new common_1.BadRequestException('Пользователь не подтвердил почту.');
        }
        const profileData = await this.profileModel.findOne({ where: { id_user } });
        if (!profileData) {
            return { message: 'Данных профиля нет.' };
        }
        else {
            return profileData;
        }
    }
    async addInfo(id_user, dto) {
        await this.checkUser(id_user);
        const profileData = await this.profileModel.findOne({
            where: { id_user },
            raw: true,
        });
        if (profileData) {
            throw new common_1.BadRequestException('У пользователя с таким id уже создан профиль.');
        }
        const profile = { id_user, ...dto };
        const result = await this.profileModel.create(profile);
        return result;
    }
    async updateInfo(id_user, dto) {
        await this.checkUser(id_user);
        await this.checkProfile(id_user);
        await this.profileModel.update(dto, { where: { id_user } });
        const result = this.profileModel.findOne({ where: { id_user } });
        return result;
    }
    async deleteInfo(id_user) {
        await this.checkUser(id_user);
        await this.checkProfile(id_user);
        await this.profileModel.destroy({ where: { id_user } });
        return { message: 'Данные удалены.' };
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(profiles_model_1.ProfilesExecutor)),
    __metadata("design:paramtypes", [Object, Object])
], ProfileService);
//# sourceMappingURL=profile.service.js.map