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
exports.PasswordRecoveryService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../model/users/users.model");
const token_service_1 = require("../token/token.service");
const email_service_1 = require("../email/email.service");
const jwt_secret_1 = require("../../common/constant/jwt.secret");
const sequelize_2 = require("sequelize");
const bcrypt = __importStar(require("bcrypt"));
let PasswordRecoveryService = class PasswordRecoveryService {
    userModel;
    tokenService;
    emailService;
    constructor(userModel, tokenService, emailService) {
        this.userModel = userModel;
        this.tokenService = tokenService;
        this.emailService = emailService;
    }
    async sendEmailPassword(login) {
        const user = (await this.userModel.findOne({
            where: {
                [sequelize_2.Op.or]: [
                    { username: login },
                    { email: login },
                    { phoneNumber: login },
                ],
            },
        }))?.dataValues;
        if (!user) {
            throw new common_1.BadRequestException('Пользователя с такими данными не существует.');
        }
        if (!user.isActivate) {
            throw new common_1.BadRequestException('Не было подтверждения почты.');
        }
        const tokenEmail = await this.tokenService.createToken({ id_user: user.id }, jwt_secret_1.secretKey.secretEmail, '15m');
        this.emailService.messageToEmail(user.email, 'Подтверждение сброса пароля', `http://localhost:${process.env.PORT_CLIENT}/reset-password?token=${tokenEmail}`);
        return { message: 'На почту отправлена ссылка для сброса пароля.' };
    }
    async updatePassword(dto) {
        let data;
        try {
            data = await this.tokenService.proofToken(dto.token, jwt_secret_1.secretKey.secretEmail, false);
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new common_1.ForbiddenException('Время на смену пароля истекло.');
            }
            else if (err.name === 'JsonWebTokenError') {
                throw new common_1.ForbiddenException('Токен не валиден.');
            }
            throw err;
        }
        const user = await this.userModel.findOne({ where: { id: data.id_user } });
        if (!user) {
            throw new common_1.ForbiddenException('Пользователя с таким id нет.');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        await this.userModel.update({ password: passwordHash }, { where: { id: data.id_user } });
        return { message: 'Пароль обновлен.' };
    }
};
exports.PasswordRecoveryService = PasswordRecoveryService;
exports.PasswordRecoveryService = PasswordRecoveryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, token_service_1.TokenService,
        email_service_1.EmailService])
], PasswordRecoveryService);
//# sourceMappingURL=pass_recovery.service.js.map