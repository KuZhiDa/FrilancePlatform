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
exports.ProfilesExecutor = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
let ProfilesExecutor = class ProfilesExecutor extends sequelize_typescript_1.Model {
    userProfile;
};
exports.ProfilesExecutor = ProfilesExecutor;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        unique: true,
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    __metadata("design:type", Number)
], ProfilesExecutor.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: true, validate: { min: 0 } }),
    __metadata("design:type", Number)
], ProfilesExecutor.prototype, "age", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], ProfilesExecutor.prototype, "male", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], ProfilesExecutor.prototype, "education", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'from_country', type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], ProfilesExecutor.prototype, "countryFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'from_city', type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    __metadata("design:type", String)
], ProfilesExecutor.prototype, "cityFrom", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'info_about_yourself',
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
        defaultValue: `О себе`,
    }),
    __metadata("design:type", String)
], ProfilesExecutor.prototype, "infoAboutYourself", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: 'id_user' }),
    __metadata("design:type", users_model_1.User)
], ProfilesExecutor.prototype, "userProfile", void 0);
exports.ProfilesExecutor = ProfilesExecutor = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'executor_profiles' })
], ProfilesExecutor);
//# sourceMappingURL=profiles.model.js.map