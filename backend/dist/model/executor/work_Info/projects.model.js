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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectExecutor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const work_info_model_1 = require("./work_info.model");
let ProjectExecutor = class ProjectExecutor extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'id_work_info', type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, sequelize_typescript_1.ForeignKey)(() => work_info_model_1.WorkInfoExecutor),
    __metadata("design:type", Number)
], ProjectExecutor.prototype, "id_WorkInfo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'url_git', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ProjectExecutor.prototype, "urlGit", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'project_name', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], ProjectExecutor.prototype, "projectName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: true }),
    __metadata("design:type", String)
], ProjectExecutor.prototype, "description", void 0);
ProjectExecutor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'executor_project' })
], ProjectExecutor);
exports.ProjectExecutor = ProjectExecutor;
//# sourceMappingURL=projects.model.js.map