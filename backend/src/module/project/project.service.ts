import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { orderProject } from 'src/model/users/project.model';
import { User } from 'src/model/users/users.model';
import { CheckService } from 'src/common/service/check.service';
import { GetDto } from './dto/get.dto';
import sequelize, { Op } from 'sequelize';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(orderProject) private projectModel: typeof orderProject,
    private check: CheckService,
  ) {}

  async addProject(dto: CreateDto) {
    await this.check.user(dto.executorId);
    await this.check.user(dto.customerId);
    await this.projectModel.create(dto);
  }

  async allProjectUser(dto: GetDto) {
    let where: any = {};
    if (dto.customerId) {
      where.id = { id: dto.customerId };
      where.idCustomerOrExecutor = { customerId: dto.customerId };
    } else if (dto.executorId) {
      where.id = { id: dto.executorId };
      where.idCustomerOrExecutor = { executorId: dto.executorId };
    }
    if (dto.status) {
      where.selectAll = {
        status: dto.status,
        ...where.idCustomerOrExecutor,
      };
    } else {
      where.selectAll = {
        status: { [Op.ne]: 'Завершен' },
        ...where.idCustomerOrExecutor,
      };
    }
    const data = await this.userModel.findOne({
      where: where.id,
      raw: true,
    });
    if (!data) {
      throw new BadRequestException('Пользователя с таким id не существует.');
    }
    console.log(where.selectAll);
    const projects = await this.projectModel.findAll({
      attributes: [
        'id',
        [sequelize.col('name_project'), 'projectName'],
        'id_executor',
        [sequelize.col('executor.username'), 'usernameExecutor'],
        [sequelize.col('customer.username'), 'usernameCustomer'],
        'status',
        [
          sequelize.fn('TO_CHAR', sequelize.col('deadline_date'), 'DD.MM.YYYY'),
          'deadlineDate',
        ],
        'price',
      ],
      include: [
        { model: User, as: 'executor', attributes: [] },
        { model: User, as: 'customer', attributes: [] },
      ],
      where: where.selectAll,
    });
    const result = projects.map((project) => {
      return project.get({ plain: true });
    });
    return result;
  }

  async updateStatusAccepted(projectId: number, rating: number) {
    const projectData = await this.projectModel.findOne({
      where: { id: projectId },
      raw: true,
    });
    if (!projectData) {
      throw new HttpException('Такого проекта нет.', HttpStatus.NOT_FOUND);
    }
    await this.projectModel.update(
      { status: 'Завершен' },
      { where: { id: projectId } },
    );
    const userData = await this.check.user(projectData.executorId);
    await this.userModel.update(
      {
        rating_count: userData.rating_count + 1,
        rating_sum: userData.rating_sum + rating,
      },
      { where: { id: projectData.executorId } },
    );
    return { message: 'Проект завершен' };
  }

  async updateStatusStopped(projectId: number) {
    const projectData = await this.projectModel.findOne({
      where: { id: projectId },
      raw: true,
    });
    if (!projectData) {
      throw new HttpException('Такого проекта нет.', HttpStatus.NOT_FOUND);
    }
    await this.projectModel.update(
      { status: 'Приостановлен', deadlineDate: null },
      { where: { id: projectId } },
    );
  }

  async updateDeadlineDate(projectId: number, deadlineDate: string) {
    const projectData = await this.projectModel.findOne({
      where: { id: projectId },
      raw: true,
    });
    if (!projectData) {
      throw new HttpException('Такого проекта нет.', HttpStatus.NOT_FOUND);
    }
    await this.projectModel.update(
      { status: 'В процессе', deadlineDate },
      { where: { id: projectId } },
    );
  }
}
