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
exports.DtoProfile = void 0;
const class_validator_1 = require("class-validator");
class DtoProfile {
    age;
    male;
    education;
    countryFrom;
    cityFrom;
    infoAboutYourself;
}
exports.DtoProfile = DtoProfile;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Возраст должен быть числом.' }),
    __metadata("design:type", Number)
], DtoProfile.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 20, { message: 'Название страны не верного формата.' }),
    (0, class_validator_1.Matches)(/^[А-ЯЁ][а-яё]+$/, {
        message: 'Название страны не верного формата.',
    }),
    __metadata("design:type", String)
], DtoProfile.prototype, "countryFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 20, { message: 'Название города не верного формата.' }),
    (0, class_validator_1.Matches)(/^[А-ЯЁ][а-яё]+$/, {
        message: 'Название города не верного формата.',
    }),
    __metadata("design:type", String)
], DtoProfile.prototype, "cityFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 250, { message: 'Максимальная длинна поля 250 символов' }),
    (0, class_validator_1.Matches)(/^[А-Яа-я0-9.,! ]+$/, {
        message: 'Допустимы только русские буквы, а также набор из символов (.,!).',
    }),
    __metadata("design:type", String)
], DtoProfile.prototype, "infoAboutYourself", void 0);
//# sourceMappingURL=profile.dto.js.map