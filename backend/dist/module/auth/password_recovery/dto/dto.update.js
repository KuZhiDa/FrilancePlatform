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
exports.dtoForUpdatePassword = void 0;
const class_validator_1 = require("class-validator");
class dtoForUpdatePassword {
    token;
    password;
}
exports.dtoForUpdatePassword = dtoForUpdatePassword;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Нет токена' }),
    __metadata("design:type", String)
], dtoForUpdatePassword.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле password не заполнено.' }),
    (0, class_validator_1.Length)(8, 16, { message: 'Пароль должен содержать от 8 до 16 символов' }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])([a-zA-Z0-9])+$/, {
        message: 'Пароль должен состоять хотя-бы из одной цифры, заглавной и прописной буквы. И содержать только буквы латинского алфавита и цифры.',
    }),
    __metadata("design:type", String)
], dtoForUpdatePassword.prototype, "password", void 0);
//# sourceMappingURL=dto.update.js.map