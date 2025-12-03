import { WorkInfoService } from './work-info.service';
import type { DtoCards } from './dto/cards.dto';
import type { ProjectDto } from './dto/project.dto';
export declare class WorkInfoController {
    private readonly workInfoService;
    constructor(workInfoService: WorkInfoService);
    getPortfolio(id_user: number): Promise<DtoCards[]>;
    getProject(id_card: number): Promise<ProjectDto[] | {
        message: string;
    }>;
    postCard(id_user: number, dto: DtoCards): Promise<DtoCards>;
    postProject(id_card: number, dto: ProjectDto): Promise<{
        id: number;
    }>;
    deleteProject(id_card: number): Promise<{
        message: string;
    }>;
}
