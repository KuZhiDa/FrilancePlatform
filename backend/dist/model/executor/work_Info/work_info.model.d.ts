import { Model } from 'sequelize-typescript';
import { User } from '../../users/users.model';
import { ProjectExecutor } from './projects.model';
interface PortfolioInterface {
    id_user: number;
    skillName: string;
    experience: number;
    infoAboutSkillOrExperience?: string;
}
export declare class WorkInfoExecutor extends Model<WorkInfoExecutor, PortfolioInterface> {
    id_user: number;
    skillName: string;
    experience: number;
    infoAboutSkillOrExperience?: string;
    executorProject: ProjectExecutor[];
    workInfUser: User;
}
export {};
