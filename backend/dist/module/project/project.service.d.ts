import { orderProject } from 'src/model/users/project.model';
import { User } from 'src/model/users/users.model';
import { CheckService } from 'src/common/service/check.service';
import { GetDto } from './dto/get.dto';
import { CreateDto } from './dto/create.dto';
export declare class ProjectService {
    private userModel;
    private projectModel;
    private check;
    constructor(userModel: typeof User, projectModel: typeof orderProject, check: CheckService);
    addProject(dto: CreateDto): Promise<void>;
    allProjectUser(dto: GetDto): Promise<orderProject[]>;
    updateStatusAccepted(projectId: number, rating: number): Promise<{
        message: string;
    }>;
    updateStatusStopped(projectId: number): Promise<void>;
    updateDeadlineDate(projectId: number, deadlineDate: string): Promise<void>;
}
