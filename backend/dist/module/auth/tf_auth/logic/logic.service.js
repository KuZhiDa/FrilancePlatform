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
exports.TwoFaAuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const model_user_1 = require("../../../../model/model.user");
const redis_service_1 = require("../redis/redis.service");
const token_service_1 = require("../../../token/token.service");
let TwoFaAuthService = class TwoFaAuthService {
    userModel;
    redis2faService;
    tokenService;
    constructor(userModel, redis2faService, tokenService) {
        this.userModel = userModel;
        this.redis2faService = redis2faService;
        this.tokenService = tokenService;
    }
    async checkAcceptedCode(id, code) {
        if (!(await this.redis2faService.proofCode(id, code))) {
            throw new common_1.ForbiddenException('Неверный код авторизации.');
        }
        const data = await this.userModel.findOne({ where: { id: id }, raw: true });
        if (!data) {
            throw new common_1.ForbiddenException('Такого пользователя не существует.');
        }
        const { accessToken, refreshToken } = await this.tokenService.genAccessRefresh(data.id, data.role);
        return { accessToken, refreshToken };
    }
};
exports.TwoFaAuthService = TwoFaAuthService;
exports.TwoFaAuthService = TwoFaAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(model_user_1.User)),
    __metadata("design:paramtypes", [Object, redis_service_1.RedisTwoFAService,
        token_service_1.TokenService])
], TwoFaAuthService);
//# sourceMappingURL=logic.service.js.map