"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../model/users/users.model");
const bcrypt = __importStar(require("bcrypt"));
const sequelize_2 = require("sequelize");
const jwt_secret_1 = require("../../common/constant/jwt.secret");
const token_model_1 = require("../../model/users/token.model");
const token_service_1 = require("../token/token.service");
const email_service_1 = require("../email/email.service");
const two_factor_service_1 = require("../two_factor_auth/two_factor.service");
let AuthService = class AuthService {
    userModel;
    refreshTokenModel;
    redis2faService;
    token;
    emailService;
    constructor(userModel, refreshTokenModel, redis2faService, token, emailService) {
        this.userModel = userModel;
        this.refreshTokenModel = refreshTokenModel;
        this.redis2faService = redis2faService;
        this.token = token;
        this.emailService = emailService;
    }
    async registerUser(dto) {
        let data;
        data = await this.userModel.findOne({
            where: {
                [sequelize_2.Op.or]: [
                    { username: dto.username },
                    { email: dto.email },
                    { phoneNumber: dto.phoneNumber || '' },
                ],
            },
        });
        if (data) {
            throw new common_1.HttpException('Пользователь с такими данными уже существует.', common_1.HttpStatus.BAD_REQUEST);
        }
        dto.password = await bcrypt.hash(dto.password, 10);
        const result = (await this.userModel.create(dto, { raw: true })).dataValues;
        const { password, ...person } = result;
        return person;
    }
    async loginUser(dto) {
        const data = (await this.userModel.findOne({
            where: {
                [sequelize_2.Op.or]: [
                    { username: dto.login },
                    { email: dto.login },
                    { phoneNumber: dto.login },
                ],
            },
        }))?.dataValues;
        if (!data) {
            throw new common_1.HttpException('Пользователя с такими данными не существует.', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await bcrypt.compare(dto.password, data.password);
        if (!result) {
            throw new common_1.HttpException('Пароль не верный.', common_1.HttpStatus.BAD_REQUEST);
        }
        if (data.is2Fa) {
            const codeFor2FA = await this.redis2faService.genCode(data.id);
            this.emailService.messageToEmail(data.email, 'Код для двухфакторной аутентификации.', `Подтвердите вход с помощью этого кода: ${codeFor2FA}`);
            return {
                id_user: data.id,
                role: dto.role_user,
                is2Fa: true,
                message: 'Сообщение направленно на почту для подтверждения входа.',
            };
        }
        else {
            const { accessToken, refreshToken } = await this.token.genAccessRefresh(data.id, dto.role_user);
            return {
                id_user: data.id,
                role: dto.role_user,
                is2Fa: false,
                accessToken,
                refreshToken,
                message: `Пользователь ${data.username} авторизован.`,
            };
        }
    }
    async logoutUser(refreshToken) {
        let person;
        if (refreshToken) {
            try {
                person = await this.token.proofToken(refreshToken, jwt_secret_1.secretKey.secretRefresh, true);
            }
            catch (err) {
                throw new common_1.HttpException('Ошибка валидности refresh токена', common_1.HttpStatus.FORBIDDEN);
            }
            await this.refreshTokenModel.destroy({
                where: {
                    [sequelize_2.Op.and]: [{ id: person.id }, { id_user: person.id_user }],
                },
            });
            return { message: 'Пользователь вышел.' };
        }
        throw new common_1.HttpException('Refresh токена нет.', common_1.HttpStatus.FORBIDDEN);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(token_model_1.RefreshToken)),
    __metadata("design:paramtypes", [Object, Object, two_factor_service_1.TwoFAService,
        token_service_1.TokenService,
        email_service_1.EmailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map