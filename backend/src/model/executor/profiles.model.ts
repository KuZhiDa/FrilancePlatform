import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import type { Male } from '../../common/constant/male.type';
import type { Education } from 'src/common/constant/education.type';

interface dataPortfolio {
  id_user: number;
  age?: number;
  male?: Male;
  education?: Education;
  countryFrom?: string;
  cityFrom?: string;
  infoAboutYourself?: string;
}

@Table({ tableName: 'executor_profiles' })
export class ProfilesExecutor extends Model<ProfilesExecutor, dataPortfolio> {
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  @ForeignKey(() => User)
  declare id_user: number;

  @Column({ type: DataType.INTEGER, allowNull: true, validate: { min: 0 } })
  declare age: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare male: Male;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare education: Education;

  @Column({ field: 'from_country', type: DataType.STRING, allowNull: true })
  declare countryFrom: string;

  @Column({ field: 'from_city', type: DataType.STRING, allowNull: true })
  declare cityFrom: string;

  @Column({
    field: 'info_about_yourself',
    type: DataType.STRING,
    allowNull: true,
    defaultValue: `О себе`,
  })
  declare infoAboutYourself: string;
}
