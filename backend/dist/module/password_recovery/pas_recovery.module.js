"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryModule = void 0;
const common_1 = require("@nestjs/common");
const pass_recovery_service_1 = require("./pass_recovery.service");
const pas_recovery_controller_1 = require("./pas_recovery.controller");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../../model/users/users.model");
const token_module_1 = require("../token/token.module");
const email_module_1 = require("../email/email.module");
let PasswordRecoveryModule = class PasswordRecoveryModule {
};
PasswordRecoveryModule = __decorate([
    (0, common_1.Module)({
        providers: [pass_recovery_service_1.PasswordRecoveryService],
        controllers: [pas_recovery_controller_1.PasswordRecoveryController],
        imports: [sequelize_1.SequelizeModule.forFeature([users_model_1.User]), token_module_1.TokenModule, email_module_1.EmailModule],
    })
], PasswordRecoveryModule);
exports.PasswordRecoveryModule = PasswordRecoveryModule;
//# sourceMappingURL=pas_recovery.module.js.map