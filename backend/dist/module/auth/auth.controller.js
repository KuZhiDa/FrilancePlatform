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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_register_1 = require("./dto/dto.register");
const dto_login_1 = require("./dto/dto.login");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    postRegister(body) {
        return this.authService.registerUser(body);
    }
    async postLogin(body, res) {
        const result = await this.authService.loginUser(body);
        if (result.is2Fa) {
            return result;
        }
        else {
            console.log(result.refreshToken);
            res.cookie('token', result.refreshToken, {
                httpOnly: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            return {
                id_user: result.id_user,
                role_user: result.role,
                access: result.accessToken,
                message: result.message,
            };
        }
    }
    postLogout(req, res) {
        const result = this.authService.logoutUser(req.cookies.token);
        res.clearCookie('token');
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_register_1.DtoForReg]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postRegister", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_login_1.DtoForLog, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "postLogin", null);
__decorate([
    (0, common_1.Delete)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "postLogout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map