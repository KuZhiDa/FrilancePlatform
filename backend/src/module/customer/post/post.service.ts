import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CheckService } from 'src/common/service/check.service';
import { CustomerPost } from 'src/model/customer/post.model';
import { PostReturnDto } from './dto/return.dto';
import { PostCreateDto } from './dto/create.dto';
import { PostUpdateDto } from './dto/update.dto';
import { paramsSelectDto } from './dto/params.dto';
import { Op } from 'sequelize';
import { UserDto } from 'src/common/dto/user.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(CustomerPost) private postModel: typeof CustomerPost,
    private check: CheckService,
  ) {}

  async getListPost(
    dto: paramsSelectDto,
    user: UserDto,
  ): Promise<PostReturnDto[]> {
    const where: any = {};

    if (dto.like) {
      where.projectName = { [Op.like]: `%${dto.like}%` };
    }
    where.price = {
      [Op.between]: [
        Number(dto.priceMin) || 0,
        Number(dto.priceMax) || 1000000,
      ],
    };

    const order: any[] = [];
    if (dto.sortedColumn) {
      order.push([dto.sortedColumn, dto.sortedParam || 'ASC']);
    }
    const posts = await this.postModel.findAll({
      attributes: ['id', 'projectName', 'description', 'price'],
      where: { ...where, id_user: { [Op.ne]: user.id_user } },
      order,
      offset: dto.offset,
      limit: dto.limit,
    });
    const resultPosts = posts.map((post) => {
      return post.get({ plain: true });
    });
    return resultPosts;
  }

  async getInfoPost(id_user: number): Promise<PostReturnDto[]> {
    const userData = await this.check.user(id_user);
    if (!userData.isActivate) {
      throw new HttpException(
        'Почта пользователя не подтверждена.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const postsData = await this.postModel.findAll({
      where: { id_user },
      raw: true,
    });
    return postsData;
  }

  async addPost(id_user: number, dto: PostCreateDto): Promise<{ id: number }> {
    await this.check.user(id_user);
    const postData = await this.postModel.findOne({
      where: {
        projectName: dto.projectName,
        description: dto.description,
        price: dto.price,
      },
      raw: true,
    });
    if (postData) {
      throw new HttpException('Такой пост уже создан.', HttpStatus.BAD_REQUEST);
    }
    const result = (
      await this.postModel.create({ id_user, ...dto }, { returning: ['id'] })
    ).get({
      plain: true,
    });
    return { id: result.id };
  }

  async updatePost(
    id: number,
    dto: PostUpdateDto,
  ): Promise<{ message: string }> {
    await this.checkPost(id);
    await this.postModel.update(dto, { where: { id } });
    return { message: 'Данные поста успешно обновлены.' };
  }

  async deletePost(id: number): Promise<{ message: string }> {
    await this.checkPost(id);
    await this.postModel.destroy({ where: { id } });
    return { message: 'Данные поста успешно удалены.' };
  }

  private async checkPost(id: number): Promise<PostReturnDto> {
    const postData = await this.postModel.findOne({ where: { id } });
    if (!postData) {
      throw new HttpException('Такого поста нет.', HttpStatus.NOT_FOUND);
    }
    return postData;
  }
}
