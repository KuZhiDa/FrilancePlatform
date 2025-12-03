import { ProjectService } from './project.service';
import { GetDto } from './dto/get.dto';
import { PatchDto } from './dto/patch.dto';
export declare class ProjectController {
    private projectService;
    constructor(projectService: ProjectService);
    getProject(dto: GetDto): Promise<import("../../model/users/project.model").orderProject[]>;
    updateProjectOptions(projectId: number, body: PatchDto): Promise<void | {
        message: string;
    }>;
}
