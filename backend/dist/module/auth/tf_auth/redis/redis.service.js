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
exports.RedisTwoFAService = void 0;
const ioredis_1 = require("@nestjs-modules/ioredis");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const ioredis_2 = __importDefault(require("ioredis"));
const model_user_1 = require("../../../../model/model.user");
const token_service_1 = require("../../../token/token.service");
let RedisTwoFAService = class RedisTwoFAService {
    redis;
    userModel;
    tokenService;
    constructor(redis, userModel, tokenService) {
        this.redis = redis;
        this.userModel = userModel;
        this.tokenService = tokenService;
    }
    async genCode(id_user) {
        if (await this.redis.get(String(id_user))) {
            throw new common_1.ForbiddenException('Прошлый код еще действителен');
        }
        const codeFor2FA = String(Math.floor(Math.random() * (1000000 - 100000) + 100000));
        await this.redis.set(String(id_user), codeFor2FA, 'EX', 900);
        return codeFor2FA;
    }
    async proofCode(id_user, code) {
        console.log(id_user);
        const codeFor2FA = await this.redis.get(String(id_user));
        if (!codeFor2FA) {
            throw new common_1.ForbiddenException('Кода нет или срок действия его истек.');
        }
        if (codeFor2FA !== code) {
            throw new common_1.ForbiddenException('Неверный код подтверждения.');
        }
        await this.redis.del(String(id_user));
        return true;
    }
    async checkAcceptedCode(id, code) {
        if (!(await this.proofCode(id, code))) {
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
exports.RedisTwoFAService = RedisTwoFAService;
exports.RedisTwoFAService = RedisTwoFAService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, ioredis_1.InjectRedis)()),
    __param(1, (0, sequelize_1.InjectModel)(model_user_1.User)),
    __metadata("design:paramtypes", [ioredis_2.default, Object, token_service_1.TokenService])
], RedisTwoFAService);
//# sourceMappingURL=redis.service.js.map