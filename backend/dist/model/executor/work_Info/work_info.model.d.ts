import { Model } from 'sequelize-typescript';
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
    project: ProjectExecutor[];
}
export {};
