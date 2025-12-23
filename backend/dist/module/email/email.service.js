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
const users_model_1 = require("../../model/users/users.model");
const token_service_1 = require("../token/token.service");
const jwt_secret_1 = require("../../common/constant/jwt.secret");
const mailer_1 = require("@nestjs-modules/mailer");
const messageEmailProof_1 = require("../../common/constant/messageEmailProof");
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
            person = await this.token.proofToken(tokenEmail, jwt_secret_1.secretKey.secretEmail, false);
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                throw new common_1.HttpException('Время для подтверждения email истекло.', common_1.HttpStatus.FORBIDDEN);
            }
            else if (err.name === 'JsonWebTokenError') {
                throw new common_1.HttpException('Токен не валиден.', common_1.HttpStatus.FORBIDDEN);
            }
            throw err;
        }
        const user = (await this.userModel.findOne({ where: { id: person.id_user } }))?.dataValues;
        if (!user) {
            throw new common_1.HttpException('Пользователь не найден.', common_1.HttpStatus.FORBIDDEN);
        }
        if (user.isActivate) {
            return { message: 'Email пользователя уже подтвержден.' };
        }
        await this.userModel.update({ isActivate: true }, { where: { id: person.id_user } });
        return { message: `Email пользователя ${user.username} подтвержден.` };
    }
    async messageEmail(id_user) {
        const dataUser = await this.userModel.findOne({
            where: { id: id_user },
            raw: true,
        });
        if (!dataUser) {
            throw new common_1.BadRequestException('Пользователя с таким id нет.');
        }
        if (dataUser.isActivate) {
            return { message: 'Email пользователя уже подтвержден.' };
        }
        const tokenEmail = await this.token.createToken({ id_user }, jwt_secret_1.secretKey.secretEmail, '24h');
        return await this.messageToEmail(dataUser.email, messageEmailProof_1.messageEmailProof.subject, messageEmailProof_1.messageEmailProof.text + tokenEmail);
    }
    async messageToEmail(to, subject, text) {
        if (!process.env.EMAIL_LOGIN) {
            throw new common_1.HttpException('Не указана email отправителя.', common_1.HttpStatus.FORBIDDEN);
        }
        const html = `<!DOCTYPE html> <html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4a90e2;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .content h2 {
      color: #4a90e2;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 20px 0;
      background-color: #4a90e2;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f7;
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${subject}
    </div>
    <div class="content">
      <h2>Привет!</h2>
      <a href="${text}">${text}</a>
      <p>Если вы не отправляли этот запрос, просто проигнорируйте это письмо.</p>
      <p>С уважением,<br>Команда поддержки</p>
    </div>
    <div class="footer">
      &copy; 2025 KuZhiDa. Все права защищены.
    </div>
  </div>
</body>
</html>
`;
        this.nodemailer.sendMail({
            from: process.env.EMAIL_LOGIN,
            to,
            subject,
            html,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, token_service_1.TokenService,
        mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map