"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkInfoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const projects_model_1 = require("../../../model/executor/work_Info/projects.model");
const check_service_1 = require("../../../common/service/check.service");
const work_info_model_1 = require("../../../model/executor/work_Info/work_info.model");
const sequelize_2 = require("sequelize");
let WorkInfoService = class WorkInfoService {
    workInfoModel;
    projectModel;
    check;
    constructor(workInfoModel, projectModel, check) {
        this.workInfoModel = workInfoModel;
        this.projectModel = projectModel;
        this.check = check;
    }
    async getWorkInfo(id_user) {
        const dataUser = await this.check.user(id_user);
        if (!dataUser.isActivate) {
            throw new common_1.HttpException('Пользователь не подтвердил почту.', common_1.HttpStatus.BAD_REQUEST);
        }
        const workInfo = await this.workInfoModel.findAll({
            where: { id_user },
            raw: true,
        });
        const result = await Promise.all(workInfo.map(async (skill) => {
            const project = await this.getProject(skill.id);
            let projectResult = false;
            if (typeof project != 'string') {
                projectResult = true;
            }
            else {
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
        }));
        return result;
    }
    async getProject(id_card) {
        const workInfoData = await this.workInfoModel.findOne({
            where: { id: id_card },
        });
        if (!workInfoData) {
            throw new common_1.HttpException('Карточки с таким id нет.', common_1.HttpStatus.NOT_FOUND);
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
    async addCard(id_user, dto) {
        await this.check.user(id_user);
        const card = { id_user, ...dto };
        const cardData = await this.workInfoModel.findOne({
            where: { skillName: card.skillName, id_user: id_user },
        });
        if (cardData) {
            throw new common_1.HttpException('Карточка с таким названием уже существует.', common_1.HttpStatus.FORBIDDEN);
        }
        const result = await this.workInfoModel.create(card);
        dto.id = result.id;
        return dto;
    }
    async addProject(id_card, dto) {
        const workInfoData = await this.workInfoModel.findOne({
            where: { id: id_card },
        });
        if (!workInfoData) {
            throw new common_1.HttpException('Карточки с таким id нет.', common_1.HttpStatus.NOT_FOUND);
        }
        const projectData = await this.projectModel.findOne({
            where: {
                [sequelize_2.Op.or]: [{ projectName: dto.projectName }, { urlGit: dto.urlGit }],
            },
            raw: true,
        });
        if (projectData) {
            throw new common_1.HttpException('Такой проект уже добавлен.', common_1.HttpStatus.BAD_REQUEST);
        }
        const result = await this.projectModel.create(dto, { raw: true });
        return { id: result.dataValues.id };
    }
    async clearProjectInfo(id_project) {
        const projectData = await this.projectModel.findOne({
            where: {
                id: id_project,
            },
            raw: true,
        });
        if (!projectData) {
            throw new common_1.HttpException('Такого проекта нет.', common_1.HttpStatus.NOT_FOUND);
        }
        await this.projectModel.destroy({ where: { id: id_project } });
        return { message: 'Проект удален.' };
    }
};
exports.WorkInfoService = WorkInfoService;
exports.WorkInfoService = WorkInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(work_info_model_1.WorkInfoExecutor)),
    __param(1, (0, sequelize_1.InjectModel)(projects_model_1.ProjectExecutor)),
    __metadata("design:paramtypes", [Object, Object, check_service_1.CheckService])
], WorkInfoService);
//# sourceMappingURL=work-info.service.js.map