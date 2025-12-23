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
exports.CustomerPost = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const feedback_model_1 = require("../users/feedback.model");
let CustomerPost = class CustomerPost extends sequelize_typescript_1.Model {
    feedBack;
    user;
};
exports.CustomerPost = CustomerPost;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], CustomerPost.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], CustomerPost.prototype, "id_user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'project_name', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CustomerPost.prototype, "projectName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], CustomerPost.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], CustomerPost.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => feedback_model_1.FeedBack, {
        foreignKey: 'post_id',
        onDelete: 'CASCADE',
        hooks: true,
    }),
    __metadata("design:type", Array)
], CustomerPost.prototype, "feedBack", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: 'id_user' }),
    __metadata("design:type", users_model_1.User)
], CustomerPost.prototype, "user", void 0);
exports.CustomerPost = CustomerPost = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'customer_post' })
], CustomerPost);
//# sourceMappingURL=post.model.js.map