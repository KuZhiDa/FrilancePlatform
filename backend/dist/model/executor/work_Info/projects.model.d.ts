import { Model } from 'sequelize-typescript';
import { WorkInfoExecutor } from './work_info.model';
interface modelPortfolioProject {
    id_WorkInfo: number;
    urlGit: string;
    projectName: string;
    description?: string;
}
export declare class ProjectExecutor extends Model<ProjectExecutor, modelPortfolioProject> {
    id_WorkInfo: number;
    urlGit: string;
    projectName: string;
    description?: string;
    projectWorkInfo: WorkInfoExecutor;
}
export {};
