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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFaAuthController = void 0;
const common_1 = require("@nestjs/common");
const logic_service_1 = require("./logic.service");
const ioredis_1 = __importDefault(require("ioredis"));
const ioredis_2 = require("@nestjs-modules/ioredis");
let TwoFaAuthController = class TwoFaAuthController {
    redis;
    twoFaService;
    constructor(redis, twoFaService) {
        this.redis = redis;
        this.twoFaService = twoFaService;
    }
    async postAcceptedCode(id, code, res) {
        const { accessToken, refreshToken } = await this.twoFaService.checkAcceptedCode(id, code);
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
exports.TwoFaAuthController = TwoFaAuthController;
__decorate([
    (0, common_1.Post)('proof-code'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)('code')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], TwoFaAuthController.prototype, "postAcceptedCode", null);
exports.TwoFaAuthController = TwoFaAuthController = __decorate([
    (0, common_1.Controller)('2fa'),
    __param(0, (0, ioredis_2.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.default,
        logic_service_1.TwoFaAuthService])
], TwoFaAuthController);
//# sourceMappingURL=logic.controller.js.map