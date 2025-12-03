import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/model/users/users.model';
import { dtoForUpdate } from './dto/dto.update';
import { ImageService } from '../image/image.service';

@Injectable()
export class UsersService {
  //Конструктор для подключения моделей и провайдеров
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private imageService: ImageService,
  ) {}

  //-------Метод реализации получения данных пользователя---------//
  async getInfo(id_user: number): Promise<Object> {
    const data = await this.userModel.findOne({
      attributes: [
        'username',
        'email',
        'phone_number',
        'rating_count',
        'rating_sum',
      ],
      where: { id: id_user },
      raw: true,
    });
    if (!data) {
      throw new BadRequestException('Пользователя с таким id нет.');
    }
    let resultData;
    if (data.rating_count > 0) {
      resultData = {
        rating: data.rating_sum / data.rating_count,
        ...data,
      };
    } else {
      resultData = {
        rating: 0,
        ...data,
      };
    }
    const imageInfo = await this.imageService.getAvatar(id_user);
    return { resultData, imageInfo };
  }

  //--------Метод реализации обновления данных пользователя----------//
  async updateInfo(
    id_user: number,
    dto: dtoForUpdate,
  ): Promise<{ message: string }> {
    const data = await this.userModel.findOne({
      where: { id: id_user },
      raw: true,
    });
    if (!data) {
      throw new BadRequestException('Пользователя с таким id нет.');
    }
    await this.userModel.update(dto, { where: { id: id_user } });
    return { message: 'Данные успешно обновлены.' };
  }
}
