import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { RefreshToken } from 'src/model/model.token';
import { dtoForProof } from '../../dto//dto.proof';
import { secretKey } from 'src/constant/secret';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  //Конструктор для подключения моделей и провайдеров
  constructor(
    @InjectModel(RefreshToken) private refreshTokenModel: typeof RefreshToken,
    private jwt: JwtService,
  ) {}

  //------------Метод реализации генерации Access и Refresh токена---------------//
  async genAccessRefresh(id_user, role_user) {
    const resultId = (
      await this.refreshTokenModel.create({ id_user: id_user, token: '' })
    ).dataValues.id;
    const accessToken = await this.createToken(
      { id_user: id_user, role_user: role_user },
      secretKey.secretAccess,
      '1h',
    );
    const refreshToken = await this.createToken(
      { id: resultId, id_user: id_user, role_user: role_user },
      secretKey.secretRefresh,
      '30d',
    );

    //Хеширование пароля
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    //Обновление refresh токена в бд и помещение его в cookie
    await this.refreshTokenModel.update(
      { token: refreshTokenHash },
      { where: { id: resultId } },
    );

    //Возврат токенов на клиент
    return { accessToken, refreshToken };
  }

  //--------------------Метод реализации создания токена--------------------------//
  async createToken(person: object, secret: string, time: string) {
    //Создание JWT токена
    const token = await this.jwt.signAsync(person, { secret, expiresIn: time });

    //Возврат токена
    return token;
  }

  //-------------------Метод реализации проверки токена----------------------------//
  async proofToken(
    token: string,
    secret: string,
    flag: boolean,
  ): Promise<dtoForProof> {
    //Валидация токена с перехватом ошибки
    try {
      let result: dtoForProof;

      //Проверка какой метод нужен
      if (flag) {
        result = await this.jwt.verifyAsync(token, {
          secret,
          ignoreExpiration: true,
        });
      } else {
        result = await this.jwt.verifyAsync(token, { secret });
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  //-----------------Метод реализации обновления access токена---------------------//
  async refreshUpdate(tokenRefresh: string) {
    //Проверка наличия токена
    if (!tokenRefresh) {
      throw new HttpException('Refresh токена нет.', HttpStatus.UNAUTHORIZED);
    }

    //Валидация токена с перехватом ошибки
    let person: dtoForProof;
    try {
      person = await this.proofToken(
        tokenRefresh,
        secretKey.secretRefresh,
        false,
      );
    } catch (err) {
      //Определение типа ошибки
      if (err.name === 'TokenExpiredError') {
        //Если ошибка в истечении, то проверяем на корректность и удаляем токен
        person = await this.proofToken(
          tokenRefresh,
          secretKey.secretRefresh,
          true,
        );
        await this.refreshTokenModel.destroy({
          where: { id: person.id, id_user: person.id_user },
        });
        throw new HttpException(
          'Срок действия Refresh токена истек.',
          HttpStatus.UNAUTHORIZED,
        );
      } else if (err.name === 'JsonWebTokenError') {
        throw new HttpException(
          'Refresh токен не верный.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw err;
    }
    //Если refresh токен валиден то создаем access
    const tokenAccess = await this.createToken(
      { id_user: person.id_user, role_user: person.role_user },
      secretKey.secretAccess,
      '1h',
    );

    //Возврат access токена клиенту
    return tokenAccess;
  }
}
