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
exports.MiddlewareAuthJwt = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const secret_1 = require("../constant/secret");
let MiddlewareAuthJwt = class MiddlewareAuthJwt {
    jwt;
    constructor(jwt) {
        this.jwt = jwt;
    }
    async use(req, res, next) {
        const tokenAccess = req.headers.authorization?.split(' ')[1];
        if (!tokenAccess) {
            req.messageAuth = {
                message: 'No auth'
            };
            return next();
        }
        try {
            await this.jwt.verify(tokenAccess, { secret: secret_1.secretKey.secretAccess });
            req.messageAuth = {
                message: 'Auth'
            };
        }
        catch (err) {
            if (err.name === 'TokenExpiredError') {
                req.messageAuth = {
                    message: 'Time over access'
                };
            }
            else if (err.name === 'JsonWebTokenError') {
                req.messageAuth = {
                    message: 'Access is not'
                };
            }
            else {
                throw new common_1.HttpException('Ошибка на сервере.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return next();
    }
};
exports.MiddlewareAuthJwt = MiddlewareAuthJwt;
exports.MiddlewareAuthJwt = MiddlewareAuthJwt = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], MiddlewareAuthJwt);
//# sourceMappingURL=middleware.auth.js.map