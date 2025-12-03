import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/common/constant/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<Roles[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!role) {
      return true;
    }
    let role_user = context.switchToHttp().getRequest().user.role_user;
    if (role_user === 'C') {
      role_user = 'Customer';
    } else {
      role_user = 'Executor';
    }
    return role_user === role[0] ? true : false;
  }
}
