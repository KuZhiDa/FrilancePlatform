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
exports.WorkInfoController = void 0;
const common_1 = require("@nestjs/common");
const work_info_service_1 = require("./work-info.service");
const cards_dto_1 = require("./dto/cards.dto");
const project_dto_1 = require("./dto/project.dto");
let WorkInfoController = class WorkInfoController {
    workInfoService;
    constructor(workInfoService) {
        this.workInfoService = workInfoService;
    }
    async getPortfolio(id_user) {
        return await this.workInfoService.getWorkInfo(id_user);
    }
    async getProject(id_card) {
        const result = await this.workInfoService.getProject(id_card);
        if (typeof result === 'string') {
            return { message: result };
        }
        return result;
    }
    async postCard(id_user, dto) {
        return await this.workInfoService.addCard(id_user, dto);
    }
    async postProject(id_card, dto) {
        dto.id_WorkInfo = id_card;
        return await this.workInfoService.addProject(id_card, dto);
    }
    async deleteProject(id_card) {
        return await this.workInfoService.clearProjectInfo(id_card);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkInfoController.prototype, "getPortfolio", null);
__decorate([
    (0, common_1.Get)('project/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkInfoController.prototype, "getProject", null);
__decorate([
    (0, common_1.Post)('card/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, cards_dto_1.DtoCards]),
    __metadata("design:returntype", Promise)
], WorkInfoController.prototype, "postCard", null);
__decorate([
    (0, common_1.Post)('project/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, project_dto_1.ProjectDto]),
    __metadata("design:returntype", Promise)
], WorkInfoController.prototype, "postProject", null);
__decorate([
    (0, common_1.Delete)('project/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorkInfoController.prototype, "deleteProject", null);
WorkInfoController = __decorate([
    (0, common_1.Controller)('work-info'),
    __metadata("design:paramtypes", [work_info_service_1.WorkInfoService])
], WorkInfoController);
exports.WorkInfoController = WorkInfoController;
//# sourceMappingURL=work-info.controller.js.map