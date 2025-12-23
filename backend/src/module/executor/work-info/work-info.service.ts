import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DtoCards } from './dto/cards.dto';
import { ProjectExecutor } from 'src/model/executor/work_Info/projects.model';
import { CheckService } from 'src/common/service/check.service';
import { WorkInfoExecutor } from 'src/model/executor/work_Info/work_info.model';
import { ProjectDto } from './dto/project.dto';
import { Op } from 'sequelize';

@Injectable()
export class WorkInfoService {
  constructor(
    @InjectModel(WorkInfoExecutor)
    private workInfoModel: typeof WorkInfoExecutor,
    @InjectModel(ProjectExecutor)
    private projectModel: typeof ProjectExecutor,
    private check: CheckService,
  ) {}

  async getWorkInfo(id_user: number): Promise<DtoCards[]> {
    const dataUser = await this.check.user(id_user);
    if (!dataUser.isActivate) {
      throw new HttpException(
        'Пользователь не подтвердил почту.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const workInfo = await this.workInfoModel.findAll({
      where: { id_user },
      raw: true,
    });
    const result = await Promise.all(
      workInfo.map(async (skill) => {
        const project = await this.getProject(skill.id);
        let projectResult: boolean = false;
        if (typeof project != 'string') {
          projectResult = true;
        } else {
          projectResult = false;
        }
        const card = {
          id: skill.id,
          skillName: skill.skillName,
          experience: skill.experience,
          infoAboutSkillOrExperience: skill.infoAboutSkillOrExperience,
          project: projectResult,
        };
        return card;
      }),
    );
    return result;
  }

  async getProject(id_card: number): Promise<ProjectDto[] | string> {
    const workInfoData = await this.workInfoModel.findOne({
      where: { id: id_card },
    });
    if (!workInfoData) {
      throw new HttpException('Карточки с таким id нет.', HttpStatus.NOT_FOUND);
    }
    const projectsData = await this.projectModel.findAll({
      where: { id_WorkInfo: id_card },
      raw: true,
    });
    if (projectsData.length === 0) {
      return 'Проектов нет';
    }
    return projectsData;
  }

  async addCard(id_user: number, dto: DtoCards): Promise<DtoCards> {
    await this.check.user(id_user);
    const card = { id_user, ...dto };
    const cardData = await this.workInfoModel.findOne({
      where: { skillName: card.skillName, id_user: id_user },
    });
    if (cardData) {
      throw new HttpException(
        'Карточка с таким названием уже существует.',
        HttpStatus.FORBIDDEN,
      );
    }
    const result = await this.workInfoModel.create(card);
    dto.id = result.id;
    return dto;
  }

  async addProject(id_card: number, dto: ProjectDto): Promise<{ id: number }> {
    const workInfoData = await this.workInfoModel.findOne({
      where: { id: id_card },
    });
    if (!workInfoData) {
      throw new HttpException('Карточки с таким id нет.', HttpStatus.NOT_FOUND);
    }
    const projectData = await this.projectModel.findOne({
      where: {
        [Op.or]: [{ projectName: dto.projectName }, { urlGit: dto.urlGit }],
      },
      raw: true,
    });
    if (projectData) {
      throw new HttpException(
        'Такой проект уже добавлен.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.projectModel.create(dto, { raw: true });
    return { id: result.dataValues.id };
  }

  async clearProjectInfo(id_project: number): Promise<{ message: string }> {
    const projectData = await this.projectModel.findOne({
      where: {
        id: id_project,
      },
      raw: true,
    });
    if (!projectData) {
      throw new HttpException('Такого проекта нет.', HttpStatus.NOT_FOUND);
    }
    await this.projectModel.destroy({ where: { id: id_project } });
    return { message: 'Проект удален.' };
  }
}
