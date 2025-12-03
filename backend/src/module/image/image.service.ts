import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from 'src/model/users/image.model';
import { User } from 'src/model/users/users.model';
import { DtoAddImage } from './dto/add.dto';
import fs from 'fs/promises';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Images) private imagesModel: typeof Images,
    @InjectModel(User) private userModel: typeof User,
  ) {}
  async getAvatar(id_user: number) {
    const avatar = await this.imagesModel.findOne({
      where: { id_user },
      raw: true,
    });
    if (!avatar) {
      return { message: 'У пользователя нет загруженной аватарки.' };
    }
    try {
      const path = './public';
      await fs.access(`${path}/${avatar.name_image}`);
      return { avatar_name: avatar.name_image };
    } catch (err) {
      await this.imagesModel.destroy({
        where: { name_image: avatar.name_image },
      });
      return { message: 'У пользователя нет загруженной аватарки.' };
    }
  }

  async setAvatar(dto: DtoAddImage) {
    const user = await this.userModel.findOne({ where: { id: dto.id_user } });
    if (!user) {
      throw new BadRequestException('Такого пользователя нет.');
    }
    const image = await this.imagesModel.findOne({
      where: { id_user: dto.id_user },
      raw: true,
    });
    if (!image) {
      await this.imagesModel.create(dto);
    } else {
      await this.imagesModel.update(
        { url_on_image: dto.url_on_image, name_image: dto.name_image },
        { where: { id_user: dto.id_user } },
      );
      try {
        const path = './public';
        await fs.access(`${path}/${image.name_image}`);
        await fs.unlink(`${path}/${image.name_image}`);
      } catch (err) {
        console.error('Файл не найден в директории ./public');
      }
    }
    return { message: 'Аватарка успешно добавлена' };
  }
}
