import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { DtoForReg } from './dto/dto.register';
import * as bcrypt from 'bcrypt';
import { DtoForReturn } from '../../common/dto/dto.return';
import { Op } from 'sequelize';
import { DtoForLog } from './dto/dto.login';
import { secretKey } from '../../common/constant/jwt.secret';
import { RefreshToken } from '../../model/users/token.model';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
import { dtoForProof } from 'src/common/dto/dto.proof';
import { TwoFAService } from 'src/module/two_factor_auth/two_factor.service';
import { DtoFor2FaReturn } from './dto/dto.two_factor_return';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
    private redis2faService: TwoFAService,
    private token: TokenService,
    private emailService: EmailService,
  ) {}

  async registerUser(dto: DtoForReg): Promise<DtoForReturn> {
    let data;
    data = await this.userModel.findOne({
      where: {
        [Op.or]: [
          { username: dto.username },
          { email: dto.email },
          { phoneNumber: dto.phoneNumber || '' },
        ],
      },
    });
    if (data) {
      throw new HttpException(
        'Пользователь с такими данными уже существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    dto.password = await bcrypt.hash(dto.password, 10);
    const result = (await this.userModel.create(dto, { raw: true })).dataValues;
    const { password, ...person } = result;

    return person;
  }

  async loginUser(dto: DtoForLog): Promise<DtoFor2FaReturn> {
    const data = (
      await this.userModel.findOne({
        where: {
          [Op.or]: [
            { username: dto.login },
            { email: dto.login },
            { phoneNumber: dto.login },
          ],
        },
      })
    )?.dataValues;
    if (!data) {
      throw new HttpException(
        'Пользователя с такими данными не существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Проверка пароля
    const result = await bcrypt.compare(dto.password, data.password);
    if (!result) {
      throw new HttpException('Пароль не верный.', HttpStatus.BAD_REQUEST);
    }

    if (data.is2Fa) {
      const codeFor2FA = await this.redis2faService.genCode(data.id);
      this.emailService.messageToEmail(
        data.email,
        'Код для двухфакторной аутентификации.',
        `Подтвердите вход с помощью этого кода: ${codeFor2FA}`,
      );

      return {
        id_user: data.id,
        role: dto.role_user,
        is2Fa: true,
        message: 'Сообщение направленно на почту для подтверждения входа.',
      };
    } else {
      const { accessToken, refreshToken } = await this.token.genAccessRefresh(
        data.id,
        dto.role_user,
      );

      return {
        id_user: data.id,
        role: dto.role_user,
        is2Fa: false,
        accessToken,
        refreshToken,
        message: `Пользователь ${data.username} авторизован.`,
      };
    }
  }

  async logoutUser(refreshToken: string): Promise<{ message: string }> {
    let person: dtoForProof;

    if (refreshToken) {
      try {
        person = await this.token.proofToken(
          refreshToken,
          secretKey.secretRefresh,
          true,
        );
      } catch (err) {
        throw new HttpException(
          'Ошибка валидности refresh токена',
          HttpStatus.FORBIDDEN,
        );
      }

      await this.refreshTokenModel.destroy({
        where: {
          [Op.and]: [{ id: person.id }, { id_user: person.id_user }],
        },
      });

      return { message: 'Пользователь вышел.' };
    }

    throw new HttpException('Refresh токена нет.', HttpStatus.FORBIDDEN);
  }
}
