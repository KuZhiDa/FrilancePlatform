import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secretKey } from 'src/common/constant/jwt.secret';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey.secretAccess,
    });
  }

  async validate(person: { id_user: string; role_user: string }) {
    return { id_user: person.id_user, role_user: person.role_user };
  }
}
