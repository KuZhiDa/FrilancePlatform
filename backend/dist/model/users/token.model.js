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
exports.RefreshToken = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("./users.model");
let RefreshToken = class RefreshToken extends sequelize_typescript_1.Model {
    tokenUser;
};
exports.RefreshToken = RefreshToken;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.SMALLINT, allowNull: false }),
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    __metadata("design:type", Number)
], RefreshToken.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, unique: true, allowNull: false }),
    __metadata("design:type", String)
], RefreshToken.prototype, "token", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: 'id_user' }),
    __metadata("design:type", users_model_1.User)
], RefreshToken.prototype, "tokenUser", void 0);
exports.RefreshToken = RefreshToken = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'token_refresh' })
], RefreshToken);
//# sourceMappingURL=token.model.js.map