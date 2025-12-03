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
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Нет токена.' }),
    __metadata("design:type", String)
], dtoForUpdatePassword.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле password не должно быть пустым' }),
    (0, class_validator_1.Length)(8, 16, {
        message: 'Поле password должно содержать от 8 до 16 символов.',
    }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: 'Поле password должно состоять из цифр и букв латинского алфавита.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/, {
        message: 'Поле password должно содержать хотя-бы одну заглавную, одну строчную букву и цифру',
    }),
    __metadata("design:type", String)
], dtoForUpdatePassword.prototype, "password", void 0);
exports.dtoForUpdatePassword = dtoForUpdatePassword;
//# sourceMappingURL=update-password.dto.js.map