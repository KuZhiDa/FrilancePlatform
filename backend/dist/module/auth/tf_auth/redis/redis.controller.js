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
exports.RedisTwoFAController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
let RedisTwoFAController = class RedisTwoFAController {
    redis2faService;
    constructor(redis2faService) {
        this.redis2faService = redis2faService;
    }
    async postSet() {
        this.redis2faService.genCode(15);
    }
    async postGet() {
        return this.redis2faService.proofCode(15, '342395');
    }
    async postAcceptedCode(id, code, res) {
        const { accessToken, refreshToken } = await this.redis2faService.checkAcceptedCode(id, code);
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
exports.RedisTwoFAController = RedisTwoFAController;
__decorate([
    (0, common_1.Post)('set'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RedisTwoFAController.prototype, "postSet", null);
__decorate([
    (0, common_1.Post)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RedisTwoFAController.prototype, "postGet", null);
__decorate([
    (0, common_1.Post)('proof-code'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)('code')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], RedisTwoFAController.prototype, "postAcceptedCode", null);
exports.RedisTwoFAController = RedisTwoFAController = __decorate([
    (0, common_1.Controller)('redis2fa'),
    __metadata("design:paramtypes", [redis_service_1.RedisTwoFAService])
], RedisTwoFAController);
//# sourceMappingURL=redis.controller.js.map