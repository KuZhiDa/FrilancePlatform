import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/users.model';
import { ProjectExecutor } from './projects.model';

interface PortfolioInterface {
  id_user: number;
  skillName: string;
  experience: number;
  infoAboutSkillOrExperience?: string;
}

@Table({ tableName: 'executor_work_info' })
export class WorkInfoExecutor extends Model<
  WorkInfoExecutor,
  PortfolioInterface
> {
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  declare id_user: number;

  @Column({
    field: 'name_skill',
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare skillName: string;

  @Column({
    field: 'work_experience',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare experience: number;

  @Column({
    field: 'info_about_skill_or_experience',
    type: DataType.STRING,
    allowNull: true,
  })
  declare infoAboutSkillOrExperience?: string;

  @HasMany(() => ProjectExecutor, { foreignKey: 'id_work_info' })
  project: ProjectExecutor[];
}
