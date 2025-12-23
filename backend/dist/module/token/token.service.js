"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const token_model_1 = require("../../model/users/token.model");
const jwt_secret_1 = require("../../common/constant/jwt.secret");
const bcrypt = __importStar(require("bcrypt"));
let TokenService = class TokenService {
    refreshTokenModel;
    jwt;
    constructor(refreshTokenModel, jwt) {
        this.refreshTokenModel = refreshTokenModel;
        this.jwt = jwt;
    }
    async genAccessRefresh(id_user, role_user) {
        const resultId = (await this.refreshTokenModel.create({ id_user: id_user, token: '' })).dataValues.id;
        const accessToken = await this.createToken({ id_user: id_user, role_user }, jwt_secret_1.secretKey.secretAccess, '10m');
        const refreshToken = await this.createToken({ id: resultId, id_user: id_user, role_user }, jwt_secret_1.secretKey.secretRefresh, '24h');
        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await this.refreshTokenModel.update({ token: refreshTokenHash }, { where: { id: resultId } });
        return { accessToken, refreshToken };
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
    async refreshUpdate(tokenRefresh, res) {
        if (!tokenRefresh) {
            throw new common_1.HttpException('Refresh токена нет.', common_1.HttpStatus.UNAUTHORIZED);
        }
        let person;
        try {
            person = await this.proofToken(tokenRefresh, jwt_secret_1.secretKey.secretRefresh, false);
        }
        catch (err) {
            res.clearCookie('token');
            if (err.name === 'TokenExpiredError') {
                person = await this.proofToken(tokenRefresh, jwt_secret_1.secretKey.secretRefresh, true);
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
        const tokenAccess = await this.createToken({ id_user: person.id_user, role_user: person.role_user }, jwt_secret_1.secretKey.secretAccess, '10m');
        return { access: tokenAccess };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(token_model_1.RefreshToken)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], TokenService);
//# sourceMappingURL=token.service.js.map