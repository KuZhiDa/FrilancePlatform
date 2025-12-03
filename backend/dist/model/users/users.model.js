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
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const token_model_1 = require("./token.model");
const project_model_1 = require("./project.model");
const image_model_1 = require("./image.model");
const profiles_model_1 = require("../executor/profiles.model");
const work_info_model_1 = require("../executor/work_Info/work_info.model");
const feedback_model_1 = require("../users/feedback.model");
let User = class User extends sequelize_typescript_1.Model {
    refreshToken;
    projectAsExecutor;
    projectAsCustomer;
    image;
    profileExecutor;
    workInfoExecutor;
    feedBack;
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'phone_number',
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
    }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'is_activate', type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActivate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'is_2fa', type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    __metadata("design:type", Boolean)
], User.prototype, "is2Fa", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rating_count", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], User.prototype, "rating_sum", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => token_model_1.RefreshToken, { foreignKey: 'id_user', onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "refreshToken", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => project_model_1.orderProject, {
        foreignKey: 'executorId',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "projectAsExecutor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => project_model_1.orderProject, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "projectAsCustomer", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => image_model_1.Images, { foreignKey: 'id_user', onDelete: 'CASCADE' }),
    __metadata("design:type", image_model_1.Images)
], User.prototype, "image", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => profiles_model_1.ProfilesExecutor, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", profiles_model_1.ProfilesExecutor)
], User.prototype, "profileExecutor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => work_info_model_1.WorkInfoExecutor, {
        foreignKey: 'id_user',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "workInfoExecutor", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => feedback_model_1.FeedBack, { foreignKey: 'userId', onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], User.prototype, "feedBack", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'users' })
], User);
exports.User = User;
//# sourceMappingURL=users.model.js.map