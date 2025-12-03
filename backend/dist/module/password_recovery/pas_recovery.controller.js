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
exports.PasswordRecoveryController = void 0;
const common_1 = require("@nestjs/common");
const pass_recovery_service_1 = require("./pass_recovery.service");
const update_password_dto_1 = require("./dto/update-password.dto");
let PasswordRecoveryController = class PasswordRecoveryController {
    passwordRecoveryService;
    constructor(passwordRecoveryService) {
        this.passwordRecoveryService = passwordRecoveryService;
    }
    async postSandEmail(login) {
        return this.passwordRecoveryService.sendEmailPassword(login);
    }
    async postProofUpdate(body) {
        return this.passwordRecoveryService.updatePassword(body);
    }
};
__decorate([
    (0, common_1.Post)('sand'),
    __param(0, (0, common_1.Body)('login')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PasswordRecoveryController.prototype, "postSandEmail", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.dtoForUpdatePassword]),
    __metadata("design:returntype", Promise)
], PasswordRecoveryController.prototype, "postProofUpdate", null);
PasswordRecoveryController = __decorate([
    (0, common_1.Controller)('reset-password'),
    __metadata("design:paramtypes", [pass_recovery_service_1.PasswordRecoveryService])
], PasswordRecoveryController);
exports.PasswordRecoveryController = PasswordRecoveryController;
//# sourceMappingURL=pas_recovery.controller.js.map