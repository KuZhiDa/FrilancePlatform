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
exports.orderProject = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("./users.model");
let orderProject = class orderProject extends sequelize_typescript_1.Model {
    executor;
    customer;
};
__decorate([
    (0, sequelize_typescript_1.Column)({ field: 'name_project', type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], orderProject.prototype, "projectName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'id_executor',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], orderProject.prototype, "executorId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({
        field: 'id_customer',
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], orderProject.prototype, "customerId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 'В процессе',
    }),
    __metadata("design:type", String)
], orderProject.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        field: 'deadline_date',
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: true,
    }),
    __metadata("design:type", Object)
], orderProject.prototype, "deadlineDate", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], orderProject.prototype, "price", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, 'executorId'),
    __metadata("design:type", users_model_1.User)
], orderProject.prototype, "executor", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, 'customerId'),
    __metadata("design:type", users_model_1.User)
], orderProject.prototype, "customer", void 0);
orderProject = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'order_project' })
], orderProject);
exports.orderProject = orderProject;
//# sourceMappingURL=project.model.js.map