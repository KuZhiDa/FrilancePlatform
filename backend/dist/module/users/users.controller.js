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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const guard_jwt_1 = require("../../guard/guard.jwt");
const dto_update_1 = require("./dto/dto.update");
const decorator_role_1 = require("../../decorators/decorator.role");
const enumRoles_1 = require("../../constant/enumRoles");
const guard_roles_1 = require("../../guard/guard.roles");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getPersonalAccount(id) {
        return this.usersService.getUser(id);
    }
    async patchPersonalAccount(body, id) {
        return this.usersService.updateUser(body, id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.UseGuards)(guard_jwt_1.JwtAccessAuthGuard, guard_roles_1.RolesGuard),
    (0, decorator_role_1.Role)(enumRoles_1.Roles.Executor),
    (0, common_1.Get)('personAcc/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getPersonalAccount", null);
__decorate([
    (0, common_1.UseGuards)(guard_jwt_1.JwtAccessAuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Patch)('personAcc/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_update_1.dtoForUpdate, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "patchPersonalAccount", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map