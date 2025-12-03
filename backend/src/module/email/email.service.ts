import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { TokenService } from '../token/token.service';
import { secretKey } from '../../common/constant/jwt.secret';
import { MailerService } from '@nestjs-modules/mailer';
import { dtoForProof } from '../../common/dto/dto.proof';
import { messageEmailProof } from 'src/common/constant/messageEmailProof';

@Injectable()
export class EmailService {
  //конструктор для подключений провайдеров и моделей
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private token: TokenService,
    private nodemailer: MailerService,
  ) {}

  //--------------Метод реализации подтверждения почты-----------------//
  async updateIsActivate(tokenEmail: string): Promise<{ message: string }> {
    let person: dtoForProof;

    //Расшифровка токена с перехватом ошибки
    try {
      person = await this.token.proofToken(
        tokenEmail,
        secretKey.secretEmail,
        false,
      );
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new HttpException(
          'Время для подтверждения email истекло.',
          HttpStatus.FORBIDDEN,
        );
      } else if (err.name === 'JsonWebTokenError') {
        throw new HttpException('Токен не валиден.', HttpStatus.FORBIDDEN);
      }
      throw err;
    }

    //Поиск юзера с такими данными
    const user = (
      await this.userModel.findOne({ where: { id: person.id_user } })
    )?.dataValues;

    //Проверка наличия пользователя
    if (!user) {
      throw new HttpException('Пользователь не найден.', HttpStatus.FORBIDDEN);
    }

    if (user.isActivate) {
      return { message: 'Email пользователя уже подтвержден.' };
    }

    //Обновление данных в БД
    await this.userModel.update(
      { isActivate: true },
      { where: { id: person.id_user } },
    );

    //Возврат сообщения о подтверждении
    return { message: `Email пользователя ${user.username} подтвержден.` };
  }

  async messageEmail(id_user: number) {
    const dataUser = await this.userModel.findOne({
      where: { id: id_user },
      raw: true,
    });
    if (!dataUser) {
      throw new BadRequestException('Пользователя с таким id нет.');
    }

    if (dataUser.isActivate) {
      return { message: 'Email пользователя уже подтвержден.' };
    }

    const tokenEmail = await this.token.createToken(
      { id_user },
      secretKey.secretEmail,
      '24h',
    );

    return await this.messageToEmail(
      dataUser.email,
      messageEmailProof.subject,
      messageEmailProof.text + tokenEmail,
    );
  }

  //---------------------Метод для отправки сообщения на почту---------------------//
  async messageToEmail(to: string, subject: string, text: string) {
    if (!process.env.EMAIL_LOGIN) {
      throw new HttpException(
        'Не указана email отправителя.',
        HttpStatus.FORBIDDEN,
      );
    }
    const html = `<!DOCTYPE html> <html lang="ru"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #4a90e2;
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 24px;
    }
    .content {
      padding: 30px;
      color: #333333;
      line-height: 1.6;
    }
    .content h2 {
      color: #4a90e2;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      margin: 20px 0;
      background-color: #4a90e2;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      background-color: #f4f4f7;
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888888;
    }
    @media (max-width: 600px) {
      .container {
        margin: 20px;
      }
      .content {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${subject}
    </div>
    <div class="content">
      <h2>Привет!</h2>
      <a href="${text}">${text}</a>
      <p>Если вы не отправляли этот запрос, просто проигнорируйте это письмо.</p>
      <p>С уважением,<br>Команда поддержки</p>
    </div>
    <div class="footer">
      &copy; 2025 KuZhiDa. Все права защищены.
    </div>
  </div>
</body>
</html>
`;

    this.nodemailer.sendMail({
      from: process.env.EMAIL_LOGIN,
      to,
      subject,
      html,
    });
  }
}
