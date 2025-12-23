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
exports.FeedBack = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const post_model_1 = require("../customer/post.model");
const users_model_1 = require("../users/users.model");
let FeedBack = class FeedBack extends sequelize_typescript_1.Model {
    executor;
    post;
};
exports.FeedBack = FeedBack;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => post_model_1.CustomerPost),
    (0, sequelize_typescript_1.Column)({
        field: 'post_id',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], FeedBack.prototype, "postId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'user_id',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], FeedBack.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'suggested_price',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], FeedBack.prototype, "suggestedPrice", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: 'user_id' }),
    __metadata("design:type", users_model_1.User)
], FeedBack.prototype, "executor", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => post_model_1.CustomerPost, {
        foreignKey: 'post_id',
    }),
    __metadata("design:type", post_model_1.CustomerPost)
], FeedBack.prototype, "post", void 0);
exports.FeedBack = FeedBack = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'feedback' })
], FeedBack);
//# sourceMappingURL=feedback.model.js.map