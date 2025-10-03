import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request, NextFunction } from "express";
import { secretKey } from "src/constant/secret";

@Injectable()
export class MiddlewareAuthJwt implements NestMiddleware {
    constructor(private jwt: JwtService){}

    async use(req: Request, next: NextFunction) {
        const tokenAccess = req.headers.authorization?.split(' ')[1]
        if(!tokenAccess){
            (req as any).messageAuth = {
                message: 'No auth'
            }
            return next()
        }
        
        try{
            await this.jwt.verify(tokenAccess, {secret: secretKey.secretAccess});
            (req as any).messageAuth = {
                message: 'Auth'
            }
        }catch(err){
            if(err.name === 'TokenExpiredError'){
                (req as any).messageAuth = {
                    message: 'Time over access'
                }
			}
            else if(err.name === 'JsonWebTokenError'){
                (req as any).messageAuth = {
                    message: 'Access is not'
                }
            }
            else{
                throw new HttpException('Ошибка на сервере.', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        return next()
    }
}