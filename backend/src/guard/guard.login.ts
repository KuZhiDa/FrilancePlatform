import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoginGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const messageR = context.switchToHttp().getRequest().messageAuth.message
        switch (messageR) {
            case 'Auth':
                throw new HttpException('Пользователь авторизован', HttpStatus.FORBIDDEN)
            case 'No auth':
                return true
            case 'Time over access':
                throw new HttpException('Access токен истек', HttpStatus.FORBIDDEN)
            case 'Access is not':
                return true
            default:
                return false
        }
    }
}