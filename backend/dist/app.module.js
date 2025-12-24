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
const users_model_1 = require("./model/users/users.model");
const token_model_1 = require("./model/users/token.model");
const auth_module_1 = require("./module/auth/auth.module");
const passport_1 = require("@nestjs/passport");
const strategy_jwt_1 = require("./common/strategy/strategy.jwt");
const guard_jwt_1 = require("./common/guard/guard.jwt");
const jwt_1 = require("@nestjs/jwt");
const users_module_1 = require("./module/users/users.module");
const config_1 = require("@nestjs/config");
const mailer_1 = require("@nestjs-modules/mailer");
const email_module_1 = require("./module/email/email.module");
const token_module_1 = require("./module/token/token.module");
const pas_recovery_module_1 = require("./module/password_recovery/pas_recovery.module");
const ioredis_1 = require("@nestjs-modules/ioredis");
const project_module_1 = require("./module/project/project.module");
const project_model_1 = require("./model/users/project.model");
const image_module_1 = require("./module/image/image.module");
const image_model_1 = require("./model/users/image.model");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const work_info_model_1 = require("./model/executor/work_Info/work_info.model");
const projects_model_1 = require("./model/executor/work_Info/projects.model");
const profiles_model_1 = require("./model/executor/profiles.model");
const profile_module_1 = require("./module/executor/profile/profile.module");
const work_info_module_1 = require("./module/executor/work-info/work-info.module");
const post_model_1 = require("./model/customer/post.model");
const post_module_1 = require("./module/customer/post/post.module");
const feedback_model_1 = require("./model/users/feedback.model");
const feedback_module_1 = require("./module/feedback/feedback.module");
let appModule = class appModule {
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
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/avatar',
            }),
            ioredis_1.RedisModule.forRoot({
                config: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT),
                },
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: Number(process.env.EMAIL_PORT),
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_LOGIN,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USERNAME,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                synchronize: true,
                models: [
                    users_model_1.User,
                    projects_model_1.ProjectExecutor,
                    work_info_model_1.WorkInfoExecutor,
                    token_model_1.RefreshToken,
                    project_model_1.orderProject,
                    image_model_1.Images,
                    profiles_model_1.ProfilesExecutor,
                    post_model_1.CustomerPost,
                    feedback_model_1.FeedBack,
                ],
                sync: {
                    force: true,
                },
                autoLoadModels: true,
            }),
            email_module_1.EmailModule,
            token_module_1.TokenModule,
            pas_recovery_module_1.PasswordRecoveryModule,
            project_module_1.ProjectModule,
            image_module_1.ImageModule,
            profile_module_1.ProfileModule,
            work_info_module_1.WorkInfoModule,
            post_module_1.PostModule,
            feedback_module_1.FeedbackModule,
        ],
    })
], appModule);
//# sourceMappingURL=app.module.js.map