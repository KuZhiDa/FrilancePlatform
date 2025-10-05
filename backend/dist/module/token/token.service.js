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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const model_token_1 = require("../../model/model.token");
const secret_1 = require("../../constant/secret");
let TokenService = class TokenService {
    refreshTokenModel;
    jwt;
    constructor(refreshTokenModel, jwt) {
        this.refreshTokenModel = refreshTokenModel;
        this.jwt = jwt;
    }
    async createToken(person, secret, time) {
        const token = await this.jwt.signAsync(person, { secret, expiresIn: time });
        return token;
    }
    async proofToken(token, secret, flag) {
        try {
            let result;
            if (flag) {
                result = await this.jwt.verifyAsync(token, {
                    secret,
                    ignoreExpiration: true,
                });
            }
            else {
                result = await this.jwt.verifyAsync(token, { secret });
            }
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async refreshUpdate(tokenRefresh) {
        if (!tokenRefresh) {
            throw new common_1.HttpException('Refresh токена нет.', common_1.HttpStatus.UNAUTHORIZED);
        }
        let person;
        try {
            person = await this.proofToken(tokenRefresh, secret_1.secretKey.secretRefresh, false);
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                person = await this.proofToken(tokenRefresh, secret_1.secretKey.secretRefresh, true);
                await this.refreshTokenModel.destroy({
                    where: { id: person.id, id_user: person.id_user },
                });
                throw new common_1.HttpException('Срок действия Refresh токена истек.', common_1.HttpStatus.UNAUTHORIZED);
            }
            else if (err.name === 'JsonWebTokenError') {
                throw new common_1.HttpException('Refresh токен не верный.', common_1.HttpStatus.UNAUTHORIZED);
            }
            throw err;
        }
        const tokenAccess = await this.createToken({ id_user: person.id_user, role_user: person.role_user }, secret_1.secretKey.secretAccess, '1h');
        return tokenAccess;
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(model_token_1.RefreshToken)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map