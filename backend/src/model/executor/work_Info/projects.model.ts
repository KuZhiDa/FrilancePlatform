import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { WorkInfoExecutor } from './work_info.model';

interface modelPortfolioProject {
  id_WorkInfo: number;
  urlGit: string;
  projectName: string;
  description?: string;
}

@Table({ tableName: 'executor_project' })
export class ProjectExecutor extends Model<
  ProjectExecutor,
  modelPortfolioProject
> {
  @Column({ field: 'id_work_info', type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => WorkInfoExecutor)
  declare id_WorkInfo: number;

  @Column({ field: 'url_git', type: DataType.STRING, allowNull: false })
  declare urlGit: string;

  @Column({ field: 'project_name', type: DataType.STRING, allowNull: false })
  declare projectName: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string;
}
