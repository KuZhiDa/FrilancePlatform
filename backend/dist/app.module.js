"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const model_user_1 = require("./model/model.user");
const model_token_1 = require("./model/model.token");
const auth_module_1 = require("./module/auth/auth.module");
const passport_1 = require("@nestjs/passport");
const strategy_jwt_1 = require("./strategy/strategy.jwt");
const guard_jwt_1 = require("./guard/guard.jwt");
const middleware_auth_1 = require("./middleware/middleware.auth");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("./module/users/users.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const email_module_1 = require("./module/email/email.module");
const token_module_1 = require("./module/token/token.module");
let appModule = class appModule {
    configure(consumer) {
        consumer.apply(middleware_auth_1.MiddlewareAuthJwt).forRoutes('/auth/login');
    }
};
exports.appModule = appModule;
exports.appModule = appModule = __decorate([
    (0, common_1.Module)({
        providers: [strategy_jwt_1.JwtStrategy, guard_jwt_1.JwtAccessAuthGuard],
        imports: [
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            passport_1.PassportModule,
            jwt_1.JwtModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT),
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_LOGIN,
                        pass: process.env.EMAIL_PASSWORD
                    }
                }
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [model_user_1.User, model_token_1.RefreshToken],
                autoLoadModels: true,
            }),
            email_module_1.EmailModule,
            token_module_1.TokenModule,
        ],
    })
], appModule);
//# sourceMappingURL=app.module.js.map