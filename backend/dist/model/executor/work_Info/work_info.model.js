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
exports.WorkInfoExecutor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../../users/users.model");
const projects_model_1 = require("./projects.model");
let WorkInfoExecutor = class WorkInfoExecutor extends sequelize_typescript_1.Model {
    project;
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    __metadata("design:type", Number)
], WorkInfoExecutor.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'name_skill',
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
    }),
    __metadata("design:type", String)
], WorkInfoExecutor.prototype, "skillName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'work_experience',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], WorkInfoExecutor.prototype, "experience", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'info_about_skill_or_experience',
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], WorkInfoExecutor.prototype, "infoAboutSkillOrExperience", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => projects_model_1.ProjectExecutor, { foreignKey: 'id_work_info' }),
    __metadata("design:type", Array)
], WorkInfoExecutor.prototype, "project", void 0);
WorkInfoExecutor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'executor_work_info' })
], WorkInfoExecutor);
exports.WorkInfoExecutor = WorkInfoExecutor;
//# sourceMappingURL=work_info.model.js.map