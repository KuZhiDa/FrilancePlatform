import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { TokenService } from 'src/module/token/token.service';
import { EmailService } from 'src/module/email/email.service';
import { secretKey } from '../../common/constant/jwt.secret';
import { dtoForProof } from 'src/common/dto/dto.proof';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { dtoForUpdatePassword } from './dto/update-password.dto';

@Injectable()
export class PasswordRecoveryService {
  //Конструктор для подключения модулей и провайдеров
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private tokenService: TokenService,
    private emailService: EmailService,
  ) {}

  //------------Метод реализации сброса пароля через почту---------------//
  async sendEmailPassword(login: string) {
    //Поиск юзера по логину
    const user = (
      await this.userModel.findOne({
        where: {
          [Op.or]: [
            { username: login },
            { email: login },
            { phoneNumber: login },
          ],
        },
      })
    )?.dataValues;

    //Проверка наличия
    if (!user) {
      throw new BadRequestException(
        'Пользователя с такими данными не существует.',
      );
    }

    if (!user.isActivate) {
      throw new BadRequestException('Не было подтверждения почты.');
    }
    //Если пользователь есть, создание токена
    const tokenEmail = await this.tokenService.createToken(
      { id_user: user.id },
      secretKey.secretEmail,
      '15m',
    );

    //Отправка сообщения на почту
    this.emailService.messageToEmail(
      user.email,
      'Подтверждение сброса пароля',
      `http://localhost:${process.env.PORT_CLIENT}/reset-password?token=${tokenEmail}`,
    );
    //Возврат сообщения клиенту о отправке сообщения
    return { message: 'На почту отправлена ссылка для сброса пароля.' };
  }

  //---------------Метод реализации обновления пароля-----------//
  async updatePassword(dto: dtoForUpdatePassword) {
    //Валидация токена с перехватом ошибок
    let data: dtoForProof;
    try {
      data = await this.tokenService.proofToken(
        dto.token,
        secretKey.secretEmail,
        false,
      );
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new ForbiddenException('Время на смену пароля истекло.');
      } else if (err.name === 'JsonWebTokenError') {
        throw new ForbiddenException('Токен не валиден.');
      }
      throw err;
    }

    //Поиск юзера по id
    const user = await this.userModel.findOne({ where: { id: data.id_user } });
    if (!user) {
      throw new ForbiddenException('Пользователя с таким id нет.');
    }

    //Хеширование пароля
    const passwordHash = await bcrypt.hash(dto.password, 10);

    //Если все в порядке обновляем пароль
    await this.userModel.update(
      { password: passwordHash },
      { where: { id: data.id_user } },
    );

    //Возврат сообщения на клиент об успешной операции
    return { message: 'Пароль обновлен.' };
  }
}
