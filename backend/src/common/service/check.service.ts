import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';

@Injectable()
export class CheckService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async user(id_user: number): Promise<User> {
    const dataUser = await this.userModel.findOne({
      where: { id: id_user },
      raw: true,
    });
    if (!dataUser) {
      throw new HttpException(
        'Пользователя с таким id нет.',
        HttpStatus.NOT_FOUND,
      );
    }
    return dataUser;
  }
}
