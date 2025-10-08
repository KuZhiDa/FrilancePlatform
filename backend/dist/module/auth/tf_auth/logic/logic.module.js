"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFaAuthModule = void 0;
const common_1 = require("@nestjs/common");
const logic_service_1 = require("./logic.service");
const logic_controller_1 = require("./logic.controller");
const redis_module_1 = require("../redis/redis.module");
const sequelize_1 = require("@nestjs/sequelize");
const model_user_1 = require("../../../../model/model.user");
const auth_module_1 = require("../../auth/auth.module");
const token_module_1 = require("../../../token/token.module");
let TwoFaAuthModule = class TwoFaAuthModule {
};
exports.TwoFaAuthModule = TwoFaAuthModule;
exports.TwoFaAuthModule = TwoFaAuthModule = __decorate([
    (0, common_1.Module)({
        providers: [logic_service_1.TwoFaAuthService],
        controllers: [logic_controller_1.TwoFaAuthController],
        imports: [
            redis_module_1.RedisTwoFAModule,
            sequelize_1.SequelizeModule.forFeature([model_user_1.User]),
            auth_module_1.AuthModule,
            token_module_1.TokenModule,
        ],
    })
], TwoFaAuthModule);
//# sourceMappingURL=logic.module.js.map