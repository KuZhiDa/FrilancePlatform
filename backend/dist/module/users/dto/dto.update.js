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
exports.dtoForUpdate = void 0;
const class_validator_1 = require("class-validator");
class dtoForUpdate {
    username;
    phone_number;
}
exports.dtoForUpdate = dtoForUpdate;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(4, 15, {
        message: 'Вы ввели не корректный username. Username должен содержать от 4 до 15 символов.',
    }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]+$/, {
        message: 'Username должен содержать только буквы латинского алфавита и цифры.',
    }),
    __metadata("design:type", String)
], dtoForUpdate.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(11, 11, {
        message: 'Вы ввели не корректный номер телефона. Номер телефона состоит из 11 цифр.',
    }),
    (0, class_validator_1.Matches)(/^8[0-9]+$/, { message: '' }),
    __metadata("design:type", String)
], dtoForUpdate.prototype, "phone_number", void 0);
//# sourceMappingURL=dto.update.js.map