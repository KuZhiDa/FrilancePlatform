import { InjectRedis } from '@nestjs-modules/ioredis';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Redis from 'ioredis';
import { User } from 'src/model/model.user';
import { TokenService } from 'src/module/token/token.service';

@Injectable()
export class TwoFAService {
  //Конструктор для подключение моделей и провайдеров
  constructor(
    @InjectRedis() private redis: Redis,
    @InjectModel(User) private userModel: typeof User,
    private tokenService: TokenService,
  ) {}

  //--------Метод реализации генерации кода---------//
  async genCode(id_user: number): Promise<string> {
    //Проверка был ли уже запрос
    if (await this.redis.get(String(id_user))) {
      throw new ForbiddenException('Прошлый код еще действителен');
    }

    //Если нет, то генерация кода и отправка на redis
    const codeFor2FA = String(
      Math.floor(Math.random() * (1000000 - 100000) + 100000),
    );
    await this.redis.set(String(id_user), codeFor2FA, 'EX', 900);

    //Возврат функции - код подтверждения
    return codeFor2FA;
  }

  //------Метод реализации проверки кода---------//
  async proofCode(id_user: number, code: string): Promise<boolean> {
    console.log(id_user);
    //Получение кода с redis
    const codeFor2FA = await this.redis.get(String(id_user));

    //Проверка на наличие
    if (!codeFor2FA) {
      throw new ForbiddenException('Кода нет или срок действия его истек.');
    }

    //Проверка на соответствие правильного кода и что ввел пользователь
    if (codeFor2FA !== code) {
      throw new ForbiddenException('Неверный код подтверждения.');
    }

    //Если все верно удаление кода с redis
    await this.redis.del(String(id_user));

    //Возврат положительного значения
    return true;
  }

  //----------Метод реализации проверки кода пользователя--------------//
  async checkAcceptedCode(
    id: number,
    code: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!(await this.proofCode(id, code))) {
      throw new ForbiddenException('Неверный код авторизации.');
    }

    const data = await this.userModel.findOne({ where: { id: id }, raw: true });
    if (!data) {
      throw new ForbiddenException('Такого пользователя не существует.');
    }
    const { accessToken, refreshToken } =
      await this.tokenService.genAccessRefresh(data.id, data.role);
    return { accessToken, refreshToken };
  }
}
