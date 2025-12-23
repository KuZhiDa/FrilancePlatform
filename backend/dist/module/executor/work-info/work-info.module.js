"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkInfoModule = void 0;
const common_1 = require("@nestjs/common");
const work_info_service_1 = require("./work-info.service");
const work_info_controller_1 = require("./work-info.controller");
const sequelize_1 = require("@nestjs/sequelize");
const work_info_model_1 = require("../../../model/executor/work_Info/work_info.model");
const projects_model_1 = require("../../../model/executor/work_Info/projects.model");
const common_module_1 = require("../../../common/common.module");
let WorkInfoModule = class WorkInfoModule {
};
exports.WorkInfoModule = WorkInfoModule;
exports.WorkInfoModule = WorkInfoModule = __decorate([
    (0, common_1.Module)({
        controllers: [work_info_controller_1.WorkInfoController],
        providers: [work_info_service_1.WorkInfoService],
        imports: [
            common_module_1.CommonModule,
            sequelize_1.SequelizeModule.forFeature([work_info_model_1.WorkInfoExecutor, projects_model_1.ProjectExecutor]),
        ],
    })
], WorkInfoModule);
//# sourceMappingURL=work-info.module.js.map