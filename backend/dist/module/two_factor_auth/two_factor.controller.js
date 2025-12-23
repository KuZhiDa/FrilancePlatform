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
exports.TwoFaController = void 0;
const common_1 = require("@nestjs/common");
const two_factor_service_1 = require("./two_factor.service");
const ckeck_code_dto_1 = require("./dto/ckeck-code.dto");
let TwoFaController = class TwoFaController {
    redis2faService;
    constructor(redis2faService) {
        this.redis2faService = redis2faService;
    }
    async postAcceptedCode(body, res) {
        const { accessToken, refreshToken } = await this.redis2faService.checkAcceptedCode(body);
        res.cookie('token', refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        return {
            access: accessToken,
            message: 'Двухфакторная аутентификация пройдена.',
        };
    }
};
exports.TwoFaController = TwoFaController;
__decorate([
    (0, common_1.Post)('proof-code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ckeck_code_dto_1.DtoCheckCode, Object]),
    __metadata("design:returntype", Promise)
], TwoFaController.prototype, "postAcceptedCode", null);
exports.TwoFaController = TwoFaController = __decorate([
    (0, common_1.Controller)('two-factor-auth'),
    __metadata("design:paramtypes", [two_factor_service_1.TwoFAService])
], TwoFaController);
//# sourceMappingURL=two_factor.controller.js.map