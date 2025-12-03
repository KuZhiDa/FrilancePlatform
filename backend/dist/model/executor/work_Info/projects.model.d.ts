import { Model } from 'sequelize-typescript';
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
}
export {};
