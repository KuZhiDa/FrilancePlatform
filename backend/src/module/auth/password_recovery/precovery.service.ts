import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/model.user';
import { TokenService } from 'src/module/token/token.service';
import { EmailService } from 'src/module/email/email.service';
import { secretKey } from 'src/constant/secret';
import { dtoForProof } from 'src/dto/dto.proof';
import { dtoForUpdatePassword } from './dto/dto.pupdate';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';

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
    console.log(login);
    //Поиск юзера по логину
    const user = (
      await this.userModel.findOne({
        where: {
          [Op.or]: [
            { username: login },
            { email: login },
            { phone_number: login },
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
      `Сбросить пароль перейдя по ссылке: http://localhost:${process.env.PORT}/api/reset-password/proof?token=${tokenEmail}`,
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
