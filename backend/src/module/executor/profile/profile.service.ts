import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProfilesExecutor } from 'src/model/executor/profiles.model';
import { User } from 'src/model/users/users.model';
import { DtoProfile } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(ProfilesExecutor)
    private profileModel: typeof ProfilesExecutor,
  ) {}

  async checkUser(id_user: number) {
    const userData = await this.userModel.findOne({
      where: { id: id_user },
      raw: true,
    });
    if (!userData) {
      throw new BadRequestException('Пользователя с таким id нет.');
    }
  }

  async checkProfile(id_user: number) {
    const profileData = await this.profileModel.findOne({
      where: { id_user },
      raw: true,
    });
    if (!profileData) {
      throw new BadRequestException('У пользователя с таким id нет профиля.');
    }
  }

  async getInfo(id_user: number) {
    const userData = await this.userModel.findOne({
      where: { id: id_user },
      raw: true,
    });
    if (!userData) {
      throw new BadRequestException('Пользователя с таким id нет.');
    }
    if (!userData.isActivate) {
      throw new BadRequestException('Пользователь не подтвердил почту.');
    }

    const profileData = await this.profileModel.findOne({ where: { id_user } });
    if (!profileData) {
      return { message: 'Данных профиля нет.' };
    } else {
      return profileData;
    }
  }

  async addInfo(id_user: number, dto: DtoProfile) {
    await this.checkUser(id_user);
    const profileData = await this.profileModel.findOne({
      where: { id_user },
      raw: true,
    });
    if (profileData) {
      throw new BadRequestException(
        'У пользователя с таким id уже создан профиль.',
      );
    }
    const profile = { id_user, ...dto };
    const result = await this.profileModel.create(profile);
    return result;
  }

  async updateInfo(id_user: number, dto: DtoProfile) {
    await this.checkUser(id_user);
    await this.checkProfile(id_user);

    await this.profileModel.update(dto, { where: { id_user } });
    const result = this.profileModel.findOne({ where: { id_user } });
    return result;
  }

  async deleteInfo(id_user: number) {
    await this.checkUser(id_user);
    await this.checkProfile(id_user);
    await this.profileModel.destroy({ where: { id_user } });
    return { message: 'Данные удалены.' };
  }
}
