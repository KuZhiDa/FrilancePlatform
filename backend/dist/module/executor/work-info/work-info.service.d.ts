import { DtoCards } from './dto/cards.dto';
import { ProjectExecutor } from 'src/model/executor/work_Info/projects.model';
import { CheckService } from 'src/common/service/check.service';
import { WorkInfoExecutor } from 'src/model/executor/work_Info/work_info.model';
import { ProjectDto } from './dto/project.dto';
export declare class WorkInfoService {
    private workInfoModel;
    private projectModel;
    private check;
    constructor(workInfoModel: typeof WorkInfoExecutor, projectModel: typeof ProjectExecutor, check: CheckService);
    getWorkInfo(id_user: number): Promise<DtoCards[]>;
    getProject(id_card: number): Promise<ProjectDto[] | string>;
    addCard(id_user: number, dto: DtoCards): Promise<DtoCards>;
    addProject(id_card: number, dto: ProjectDto): Promise<{
        id: number;
    }>;
    clearProjectInfo(id_project: number): Promise<{
        message: string;
    }>;
}
