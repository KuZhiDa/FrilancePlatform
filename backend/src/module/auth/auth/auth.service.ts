import {
  HttpException,
  HttpStatus,
  Injectable,
  Redirect,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { DtoForReg } from './dto/dto.register';
import * as bcrypt from 'bcrypt';
import { DtoForReturn } from '../../../dto/dto.return';
import { Op } from 'sequelize';
import { DtoForLog } from './dto/dto.login';
import { secretKey } from 'src/constant/secret';
import { RefreshToken } from 'src/model/model.token';
import { TokenService } from '../../token/token.service';
import { EmailService } from '../../email/email.service';
import { dtoForProof } from 'src/dto/dto.proof';
import { TwoFAService } from 'src/module/auth/tf_auth/2fa.service';
import { DtoFor2FaReturn } from './dto/dto.tfreturn';
import { raw } from 'express';

@Injectable()
export class AuthService {
  //Подключение провайдеров и модулей
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
    private redis2faService: TwoFAService,
    private token: TokenService,
    private emailService: EmailService,
  ) {}

  //------------Метод реализации регистрации------------------//
  async registerUser(dto: DtoForReg): Promise<DtoForReturn> {
    //Проверка на наличие пользователя
    let data;
    if (dto.phone_number) {
      data = await this.userModel.findOne({
        where: {
          [Op.or]: [
            { username: dto.username },
            { email: dto.email },
            { phone_number: dto.phone_number },
          ],
        },
      });
    } else {
      data = await this.userModel.findOne({
        where: {
          [Op.or]: [{ username: dto.username }, { email: dto.email }],
        },
      });
    }
    if (data) {
      throw new HttpException(
        'Пользователь с такими данными уже существует.',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Обработка результата
    dto.password = await bcrypt.hash(dto.password, 10);
    const result = await this.userModel.create(dto, { raw: true });
    const { password, ...person } = result;

    //Создание токена для подтверждения email
    const tokenEmail = await this.token.createToken(
      { id_user: person.id },
      secretKey.secretEmail,
      '24h',
    );

    //Отправка подтверждения на почту
    await this.emailService.messageToEmail(
      dto.email,
      'Подтверждение email.',
      `Подтвердите email перейдя по ссылке: http://localhost:${process.env.PORT}/api/email/proof?token=${tokenEmail}`,
    );

    //Возврат данных пользователя на клиент
    return person;
  }

  //----------------------------Метод реализации авторизации---------------------------//
  async loginUser(dto: DtoForLog): Promise<DtoFor2FaReturn> {
    //Проверка на существование пользователя
    const data = (
      await this.userModel.findOne({
        where: {
          [Op.or]: [
            { username: dto.login },
            { email: dto.login },
            { phone_number: dto.login },
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

    //Проверка включена ли у пользователя двухфакторная аутентификация
    if (data.is2Fa) {
      //Если есть двухфакторная аутентификация генерация кода и отправка сообщения на почту
      const codeFor2FA = await this.redis2faService.genCode(data.id);
      this.emailService.messageToEmail(
        data.email,
        'Код для двухфакторной аутентификации.',
        `Подтвердите вход с помощью этого кода: ${codeFor2FA}`,
      );

      //Возврат на клиент соответствующее сообщение
      return {
        is2Fa: true,
        message: 'Сообщение направленно на почту для подтверждения входа.',
      };
    } else {
      //Если нет двухфакторной аутентификации генерация токенов Refresh и Access
      const { accessToken, refreshToken } = await this.token.genAccessRefresh(
        data.id,
        data.role,
      );

      //Возврат токенов на клиент
      return {
        is2Fa: false,
        accessToken,
        refreshToken,
        message: `Пользователь ${data.username} авторизован.`,
      };
    }
  }

  //---------------Метод реализации выхода------------------//
  async logoutUser(refreshToken: string): Promise<{ message: string }> {
    let person: dtoForProof;

    //Проверка наличия refresh токена
    if (refreshToken) {
      //try для перехвата ошибки валидности токена
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

      //Если токен валиден то удаляем его из базы
      await this.refreshTokenModel.destroy({
        where: {
          [Op.and]: [{ id: person.id }, { id_user: person.id_user }],
        },
      });

      //Возврат сообщения клиенту о выходе пользователя
      return { message: 'Пользователь вышел, нужно очистить данные токенов.' };
    }

    //Возврат сообщения клиенту о том, что токена не было
    throw new HttpException('Refresh токена нет.', HttpStatus.FORBIDDEN);
  }
}
