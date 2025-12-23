"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const project_model_1 = require("../../model/users/project.model");
const users_model_1 = require("../../model/users/users.model");
const check_service_1 = require("../../common/service/check.service");
const sequelize_2 = __importStar(require("sequelize"));
let ProjectService = class ProjectService {
    userModel;
    projectModel;
    check;
    constructor(userModel, projectModel, check) {
        this.userModel = userModel;
        this.projectModel = projectModel;
        this.check = check;
    }
    async addProject(dto) {
        await this.check.user(dto.executorId);
        await this.check.user(dto.customerId);
        await this.projectModel.create(dto);
    }
    async allProjectUser(dto) {
        let where = {};
        if (dto.customerId) {
            where.id = { id: dto.customerId };
            where.idCustomerOrExecutor = { customerId: dto.customerId };
        }
        else if (dto.executorId) {
            where.id = { id: dto.executorId };
            where.idCustomerOrExecutor = { executorId: dto.executorId };
        }
        if (dto.status) {
            where.selectAll = {
                status: dto.status,
                ...where.idCustomerOrExecutor,
            };
        }
        else {
            where.selectAll = {
                status: { [sequelize_2.Op.ne]: 'Завершен' },
                ...where.idCustomerOrExecutor,
            };
        }
        const data = await this.userModel.findOne({
            where: where.id,
            raw: true,
        });
        if (!data) {
            throw new common_1.BadRequestException('Пользователя с таким id не существует.');
        }
        console.log(where.selectAll);
        const projects = await this.projectModel.findAll({
            attributes: [
                'id',
                [sequelize_2.default.col('name_project'), 'projectName'],
                'id_executor',
                [sequelize_2.default.col('executor.username'), 'usernameExecutor'],
                [sequelize_2.default.col('customer.username'), 'usernameCustomer'],
                'status',
                [
                    sequelize_2.default.fn('TO_CHAR', sequelize_2.default.col('deadline_date'), 'DD.MM.YYYY'),
                    'deadlineDate',
                ],
                'price',
            ],
            include: [
                { model: users_model_1.User, as: 'executor', attributes: [] },
                { model: users_model_1.User, as: 'customer', attributes: [] },
            ],
            where: where.selectAll,
        });
        const result = projects.map((project) => {
            return project.get({ plain: true });
        });
        return result;
    }
    async updateStatusAccepted(projectId, rating) {
        const projectData = await this.projectModel.findOne({
            where: { id: projectId },
            raw: true,
        });
        if (!projectData) {
            throw new common_1.HttpException('Такого проекта нет.', common_1.HttpStatus.NOT_FOUND);
        }
        await this.projectModel.update({ status: 'Завершен' }, { where: { id: projectId } });
        const userData = await this.check.user(projectData.executorId);
        await this.userModel.update({
            rating_count: userData.rating_count + 1,
            rating_sum: userData.rating_sum + rating,
        }, { where: { id: projectData.executorId } });
        return { message: 'Проект завершен' };
    }
    async updateStatusStopped(projectId) {
        const projectData = await this.projectModel.findOne({
            where: { id: projectId },
            raw: true,
        });
        if (!projectData) {
            throw new common_1.HttpException('Такого проекта нет.', common_1.HttpStatus.NOT_FOUND);
        }
        await this.projectModel.update({ status: 'Приостановлен', deadlineDate: null }, { where: { id: projectId } });
    }
    async updateDeadlineDate(projectId, deadlineDate) {
        const projectData = await this.projectModel.findOne({
            where: { id: projectId },
            raw: true,
        });
        if (!projectData) {
            throw new common_1.HttpException('Такого проекта нет.', common_1.HttpStatus.NOT_FOUND);
        }
        await this.projectModel.update({ status: 'В процессе', deadlineDate }, { where: { id: projectId } });
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(project_model_1.orderProject)),
    __metadata("design:paramtypes", [Object, Object, check_service_1.CheckService])
], ProjectService);
//# sourceMappingURL=project.service.js.map