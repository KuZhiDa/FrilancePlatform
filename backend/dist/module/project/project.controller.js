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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
const get_dto_1 = require("./dto/get.dto");
const patch_dto_1 = require("./dto/patch.dto");
let ProjectController = class ProjectController {
    projectService;
    constructor(projectService) {
        this.projectService = projectService;
    }
    async getProject(dto) {
        return this.projectService.allProjectUser(dto);
    }
    async updateProjectOptions(projectId, body) {
        if (body.rating) {
            return this.projectService.updateStatusAccepted(projectId, body.rating);
        }
        else if (body.deadlineDate) {
            return this.projectService.updateDeadlineDate(projectId, body.deadlineDate);
        }
        else {
            return this.projectService.updateStatusStopped(projectId);
        }
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_dto_1.GetDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProject", null);
__decorate([
    (0, common_1.Patch)(''),
    __param(0, (0, common_1.Query)('projectId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, patch_dto_1.PatchDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProjectOptions", null);
ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map