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
exports.DtoForReg = void 0;
const class_validator_1 = require("class-validator");
class DtoForReg {
    username;
    email;
    phone_number;
    password;
}
exports.DtoForReg = DtoForReg;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле username не должно быть пустым' }),
    (0, class_validator_1.Length)(4, 15, { message: 'Вы ввели не корректный username. Username должен содержать от 4 до 15 символов.' }),
    (0, class_validator_1.Matches)(/^[0-9a-zA-Z]+$/, { message: 'Username должен содержать только буквы латинского алфавита и цифры.' }),
    __metadata("design:type", String)
], DtoForReg.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле email не должно быть пустым' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Вы ввели не корректный email.' }),
    __metadata("design:type", String)
], DtoForReg.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(11, 11, { message: 'Вы ввели не корректный номер телефона. Номер телефона состоит из 11 цифр.' }),
    (0, class_validator_1.Matches)(/^8[0-9]+$/, { message: 'Номер телефона должен содержать только цифры.' }),
    __metadata("design:type", String)
], DtoForReg.prototype, "phone_number", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Поле password не должно быть пустым' }),
    (0, class_validator_1.Length)(8, 16, { message: 'Вы ввели не корректный пароль. Пароль должен содержать от 8 до 16 символов.' }),
    (0, class_validator_1.Matches)(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9])+$/, { message: 'Пароль должен состоять хотя-бы из одной цифры, заглавной и прописной буквы. И содержать только буквы латинского алфавита и цифры.' }),
    __metadata("design:type", String)
], DtoForReg.prototype, "password", void 0);
//# sourceMappingURL=dto.register.js.map