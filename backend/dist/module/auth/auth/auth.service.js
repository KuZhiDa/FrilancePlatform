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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const model_user_1 = require("../../../model/model.user");
const bcrypt = __importStar(require("bcrypt"));
const sequelize_2 = require("sequelize");
const secret_1 = require("../../../constant/secret");
const model_token_1 = require("../../../model/model.token");
const token_service_1 = require("../../token/token.service");
const email_service_1 = require("../../email/email.service");
let AuthService = class AuthService {
    userModel;
    refreshTokenModel;
    token;
    emailService;
    constructor(userModel, refreshTokenModel, token, emailService) {
        this.userModel = userModel;
        this.refreshTokenModel = refreshTokenModel;
        this.token = token;
        this.emailService = emailService;
    }
    async registerUser(dto) {
        let data;
        if (dto.phone_number) {
            data = await this.userModel.findOne({
                where: {
                    [sequelize_2.Op.or]: [
                        { username: dto.username },
                        { email: dto.email },
                        { phone_number: dto.phone_number }
                    ]
                }
            });
        }
        else {
            data = await this.userModel.findOne({
                where: {
                    [sequelize_2.Op.or]: [
                        { username: dto.username },
                        { email: dto.email }
                    ]
                }
            });
        }
        if (data) {
            throw new common_1.HttpException('Пользователь с такими данными уже существует.', common_1.HttpStatus.BAD_REQUEST);
        }
        dto.password = await bcrypt.hash(dto.password, 10);
        const result = await this.userModel.create(dto);
        const { password, ...person } = result.dataValues;
        const tokenEmail = await this.token.createToken({ id_user: person.id }, secret_1.secretKey.secretEmail, '24h');
        await this.emailService.messageToEmail(dto.email, 'Подтверждение email.', `Подтвердите email перейдя по ссылке: http://localhost:${process.env.PORT}/api/email/proof?token=${tokenEmail}`);
        return person;
    }
    async loginUser(dto) {
        const data = (await this.userModel.findOne({ where: { [sequelize_2.Op.or]: [
                    { username: dto.login },
                    { email: dto.login },
                    { phone_number: dto.login }
                ] }
        }))?.dataValues;
        if (!data) {
            throw new common_1.HttpException('Пользователя с такими данными не существует.', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await bcrypt.compare(dto.password, data.password);
        if (!result) {
            throw new common_1.HttpException('Пароль не верный.', common_1.HttpStatus.BAD_REQUEST);
        }
        const resultId = (await this.refreshTokenModel.create({ id_user: data.id, token: '' })).dataValues.id;
        const accessToken = await this.token.createToken({ id_user: data.id, role_user: data.role }, secret_1.secretKey.secretAccess, '1h');
        const refreshToken = await this.token.createToken({ id: resultId, id_user: data.id, role_user: data.role }, secret_1.secretKey.secretRefresh, '30d');
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await this.refreshTokenModel.update({ token: refreshTokenHash }, { where: { id: resultId }
        });
        return { accessToken, refreshToken };
    }
    async logoutUser(refreshToken) {
        let person;
        if (refreshToken) {
            try {
                person = await this.token.proofToken(refreshToken, secret_1.secretKey.secretRefresh, true);
            }
            catch (err) {
                throw new common_1.HttpException('Ошибка валидности refresh токена', common_1.HttpStatus.FORBIDDEN);
            }
            await this.refreshTokenModel.destroy({
                where: {
                    [sequelize_2.Op.and]: [{ id: person.id }, { id_user: person.id_user }],
                },
            });
            return { message: 'Пользователь вышел, нужно очистить данные токенов.' };
        }
        throw new common_1.HttpException('Refresh токена нет.', common_1.HttpStatus.FORBIDDEN);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(model_user_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(model_token_1.RefreshToken)),
    __metadata("design:paramtypes", [Object, Object, token_service_1.TokenService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map