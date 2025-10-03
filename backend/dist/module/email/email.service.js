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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const model_user_1 = require("../../model/model.user");
const token_service_1 = require("../token/token.service");
const secret_1 = require("../../constant/secret");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    userModel;
    token;
    nodemailer;
    constructor(userModel, token, nodemailer) {
        this.userModel = userModel;
        this.token = token;
        this.nodemailer = nodemailer;
    }
    async updateIsActivate(tokenEmail) {
        let person;
        try {
            person = await this.token.proofToken(tokenEmail, secret_1.secretKey.secretEmail, false);
        }
        catch (err) {
            if (err.name === 'TokenExpiresError') {
                throw new common_1.HttpException('Время для подтверждения email истекло.', common_1.HttpStatus.FORBIDDEN);
            }
            else if (err.name === 'JsonWebTokenError') {
                throw new common_1.HttpException('Токен не валиден.', common_1.HttpStatus.FORBIDDEN);
            }
        }
        const user = (await this.userModel.findOne({ where: { id: person.id_user }
        }))?.dataValues;
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден.', common_1.HttpStatus.FORBIDDEN);
        }
        if (user.isActivate) {
            throw new common_1.HttpException('Email уже подтвержден.', common_1.HttpStatus.FORBIDDEN);
        }
        await this.userModel.update({ isActivate: true }, { where: { id: person.id_user } });
        return { message: `Email пользователя ${user.username} подтвержден.` };
    }
    async messageToEmail(to, subject, text) {
        if (!process.env.EMAIL_LOGIN) {
            throw new common_1.HttpException('Не указана email отправителя.', common_1.HttpStatus.FORBIDDEN);
        }
        this.nodemailer.sendMail({ from: process.env.EMAIL_LOGIN, to, subject, text });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(model_user_1.User)),
    __metadata("design:paramtypes", [Object, token_service_1.TokenService,
        mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map